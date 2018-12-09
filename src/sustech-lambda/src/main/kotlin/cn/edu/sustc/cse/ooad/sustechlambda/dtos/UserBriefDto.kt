package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import java.util.*

data class UserBriefDto(
        val id: UUID,
        val userName: String,
        val displayName: String,
        val roles: Set<String>
)

fun User.toBriefDto() = UserBriefDto(this.id, this.userName, this.displayName, this.roles)


data class UserEditDto(
        val userName: String,
        val displayName: String
)
