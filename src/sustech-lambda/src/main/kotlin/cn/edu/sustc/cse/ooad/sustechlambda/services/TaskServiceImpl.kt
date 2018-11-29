package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import cn.edu.sustc.cse.ooad.sustechlambda.entities.TaskStatus
import org.springframework.stereotype.Service

@Service
class TaskServiceImpl : TaskServices {
    override fun runTask(task: Task): String {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getStatus(task: Task): TaskStatus {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun getOutput(task: Task): String {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}
