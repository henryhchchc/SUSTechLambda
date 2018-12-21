package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import java.util.*

data class TaskDto(
        val id: UUID,
        val script: ScriptDto,
        val startedTime: Date,
        var endTime: Date? = null,
        val owner: UserBriefDto,
        var containerId: String? = null
)

fun Task.toDto() = TaskDto(
        this.id,
        this.script.toDto(),
        this.startedTime,
        this.endTime,
        this.owner.toBriefDto(),
        this.containerId
)
