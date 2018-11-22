package cn.edu.sustc.cse.ooad.sustechlambda.persistence

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface UsersRepository : MongoRepository<User, UUID> {
    fun findByUserName(userName: String): Optional<User>
}
