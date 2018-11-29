package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class UserRegisterDto(
        @NotNull
        @Size(max = 40)
        val userName: String,

        @NotNull
        @Size(max = 40)
        val displayName: String,

        @NotNull
        val roles: Set<String>,

        @NotNull
        @Size(min = 6, max = 40)
        val password: String
)
