package cn.edu.sustc.cse.ooad.sustechlambda.dtos

data class UserRegisterDto(
        val userName: String,
        val displayName: String,
        val roles: Set<String>,
        val password: String
)
