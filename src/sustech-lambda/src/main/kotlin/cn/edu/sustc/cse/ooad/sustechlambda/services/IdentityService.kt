package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User

interface IdentityService {
    fun getCurrentUser(): User
}
