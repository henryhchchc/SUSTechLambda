package cn.edu.sustc.cse.ooad.sustechlambda.entities

import java.util.*

data class User(
        val id: UUID,
        var userName: String,
        var passwordHash: String,
        var displayName: String,
        var roles: Set<String> = emptySet()
)
