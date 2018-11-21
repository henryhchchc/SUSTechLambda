package cn.edu.sustc.cse.ooad.sustechlambda.persistence

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Task
import org.springframework.data.mongodb.repository.MongoRepository

interface TasksRepository : MongoRepository<Task, Int>
