package cn.edu.sustc.cse.ooad.sustechlambda.entities

import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

data class Task(
        val id: UUID,
        @DBRef val script: Script,
        val startedTime: Date,
        var endTime: Date? = null,
        @DBRef val owner: User,
        var containerId: String? = null
)

