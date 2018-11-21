package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import org.springframework.stereotype.Service

@Service
class IdentityServiceImpl : IdentityService {
    override fun getCurrentUser() = User(0, "", "", "", emptyList())

}
