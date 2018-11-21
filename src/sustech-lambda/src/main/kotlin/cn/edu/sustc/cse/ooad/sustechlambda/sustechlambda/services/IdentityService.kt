package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.entities.User

interface IdentityService {
    fun getCurrentUser(): User
}
