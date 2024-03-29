package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import cn.edu.sustc.cse.ooad.sustechlambda.entities.TaskStatus
import com.google.gson.GsonBuilder
import com.spotify.docker.client.DefaultDockerClient
import com.spotify.docker.client.DockerClient
import com.spotify.docker.client.messages.ContainerConfig
import com.spotify.docker.client.messages.ContainerCreation
import org.springframework.stereotype.Service
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.util.*

private val infoToStatusMap = mapOf(
        "created" to TaskStatus.QUEUEING,
        "running" to TaskStatus.RUNNING,
        "exited" to TaskStatus.FINISHED,
        "dead" to TaskStatus.ERROR
)


private val languageImages = mapOf(
        "python" to "sustech_lambda_python3",
        "javascript" to "sustech_lambda_node8",
        "bash" to "sustech_lambda_ubuntu16"
)

private val languageExtensions = mapOf(
        "python" to "py",
        "javascript" to "js",
        "bash" to "sh"
)

@Service
class TaskServicesImpl : TaskServices {

    override fun getEndTime(task: Task): Date? = if (getStatus(task) == TaskStatus.FINISHED) {
        dockerClient.inspectContainer(task.containerId).state().finishedAt()
    } else null


    private val dockerClient: DockerClient = DefaultDockerClient("unix:///var/run/docker.sock")


    override fun runTask(task: Task): String {
        val containerCreation = createContainer(task)
        dockerClient.startContainer(containerCreation.id())
        return containerCreation.id()!!
    }

    override fun getStatus(task: Task) = dockerClient.inspectContainer(task.containerId).state().status().let { infoToStatusMap[it]!! }


    override fun getOutput(task: Task): String? = if (getStatus(task) == TaskStatus.FINISHED) {
        dockerClient.logs(
                task.containerId,
                DockerClient.LogsParam.stdout(),
                DockerClient.LogsParam.stderr()
        ).use { it.readFully() }
    } else null


    private fun createContainer(task: Task): ContainerCreation {
        val imageId = languageImages[task.script.content.language]
        val config = ContainerConfig.builder()
                .image(imageId)
                .build()
        val creation = this.dockerClient.createContainer(config)
        val archivePath = createTempArchive(task)
        dockerClient.copyToContainer(archivePath, creation.id(), "/tmp/script/")
        // TODO: Delete temp files after copying
        return creation
    }

    private fun createTempArchive(task: Task): Path {
        val tempDir = File("/tmp/sustech-lambda/tasks/${task.id}/").toPath()
        Files.createDirectory(tempDir)

        val parametersJson = extractParametersJson(task)
        File("$tempDir/script.${languageExtensions[task.script.content.language]}").writeText(task.script.content.code)
        File("$tempDir/parameters.json").writeText(parametersJson)
        return tempDir
    }

    private fun extractParametersJson(task: Task) = GsonBuilder().setPrettyPrinting().create().toJson(task.parameters)

    companion object {
        init {
            val tmpPath = File("/tmp/sustech-lambda/").toPath()
            if (!Files.exists(tmpPath)) {
                Files.createDirectory(tmpPath)
            }
            val taksTmpPath = File("/tmp/sustech-lambda/tasks/").toPath()
            if (!Files.exists(taksTmpPath)) {
                Files.createDirectory(taksTmpPath)
            }
        }
    }

}
