package cn.edu.sustc.cse.ooad.sustechlambda.entities

data class User(
        var id: Int,
        var userName: String,
        var passwordHash: String,
        var displayName: String,
        var roles: List<String> = ArrayList()
)
