package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User

interface IdentityService {
    fun getCurrentUser(): User?
    fun authenticate(userName: String, password: String): String?
    fun generateAccessToken(user: User): String
}
