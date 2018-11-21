package cn.edu.sustc.cse.ooad.sustechlambda.dtos

data class UserDto(
        val id: Int,
        val userName: String,
        val displayName: String,
        val roles: List<String>
)
