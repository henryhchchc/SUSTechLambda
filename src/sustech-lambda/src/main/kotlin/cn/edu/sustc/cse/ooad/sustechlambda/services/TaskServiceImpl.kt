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

private val infoToStatusMap = mapOf(
        "created" to TaskStatus.QUEUEING,
        "running" to TaskStatus.RUNNING,
        "exited" to TaskStatus.FINISHED,
        "dead" to TaskStatus.ERROR
)

private val supportedLanguages = listOf("python", "javascript", "bash")

private val languageImages = mapOf(*supportedLanguages.map { it to "sustech_lambda_$it" }.toTypedArray())

private val languageExtensions = mapOf(
        "python" to "py",
        "javascript" to "js"
)

@Service
class TaskServicesImpl : TaskServices {

    private val dockerClient: DockerClient = DefaultDockerClient.fromEnv().build()


    override fun runTask(task: Task): String {
        val containerCreation = createContainer(task)
        dockerClient.startContainer(containerCreation.id())
        return containerCreation.id()!!
    }

    override fun getStatus(task: Task) = dockerClient.inspectContainer(task.containerId).state().status().let { infoToStatusMap[it]!! }


    override fun getOutput(task: Task): String =
            dockerClient.logs(
                    task.containerId,
                    DockerClient.LogsParam.stdout(),
                    DockerClient.LogsParam.stderr()
            ).use { it.readFully() }


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
        File("${tempDir}script.${languageExtensions[task.script.content.language]}").writeText(task.script.content.code)
        File("${tempDir}parameters.json").writeText(parametersJson)
        return tempDir
    }

    private fun extractParametersJson(task: Task) = GsonBuilder().setPrettyPrinting().create().toJson(task.parameters)

}
