package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import cn.edu.sustc.cse.ooad.sustechlambda.entities.TaskStatus
import java.util.*

data class TaskDto(
        val id: UUID,
        val scriptId: UUID,
        val startedTime: Date,
        var endTime: Date? = null,
        val owner: UserBriefDto,
        var containerId: String? = null,
        val status: TaskStatus = TaskStatus.QUEUEING,
        val output: String? = null
)

fun Task.toDto(status: TaskStatus, output: String?) = TaskDto(
        this.id,
        this.script.id,
        this.startedTime,
        this.endTime,
        this.owner.toBriefDto(),
        this.containerId,
        status,
        output
)
