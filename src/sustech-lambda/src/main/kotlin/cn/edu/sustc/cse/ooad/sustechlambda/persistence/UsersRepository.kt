package cn.edu.sustc.cse.ooad.sustechlambda.persistence

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UsersRepository : MongoRepository<User, Int>
