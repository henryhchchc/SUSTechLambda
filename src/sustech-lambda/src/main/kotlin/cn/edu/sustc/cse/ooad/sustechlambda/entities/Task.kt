package cn.edu.sustc.cse.ooad.sustechlambda.entities

import java.util.*

class Task(
        val id: Int,
        val startedTime: Date,
        var endTime: Date,
        var continerId: String? = null
)
