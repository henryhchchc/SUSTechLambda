package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.entities

import java.util.*
import kotlin.collections.ArrayList

data class User(
        var id: UUID?,
        var userName: String?,
        var passwordHash: String?,
        var displayName: String?,
        var roles: List<String> = ArrayList()
)
