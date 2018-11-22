package cn.edu.sustc.cse.ooad.sustechlambda.persistence

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.*

interface TasksRepository : MongoRepository<Task, UUID>
