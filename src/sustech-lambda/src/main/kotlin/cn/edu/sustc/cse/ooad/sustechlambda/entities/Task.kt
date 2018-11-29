package cn.edu.sustc.cse.ooad.sustechlambda.entities

import java.util.*

class Task(
        val id: UUID,
        val startedTime: Date,
        var endTime: Date,
        val script: Script,
        var continerId: String? = null
)

