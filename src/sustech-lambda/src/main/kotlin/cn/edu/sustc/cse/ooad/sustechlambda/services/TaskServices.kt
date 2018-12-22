package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import cn.edu.sustc.cse.ooad.sustechlambda.entities.TaskStatus
import java.util.*

interface TaskServices {
    fun runTask(task: Task): String
    fun getStatus(task: Task): TaskStatus
    fun getOutput(task: Task): String?
    fun getEndTime(task: Task): Date?
}
