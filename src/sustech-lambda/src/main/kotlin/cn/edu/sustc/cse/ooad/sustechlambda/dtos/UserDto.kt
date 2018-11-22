package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import java.util.*

data class UserDto(
        val id: UUID,
        val userName: String,
        val displayName: String,
        val roles: Set<String>
)
