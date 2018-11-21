package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.persistence

import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.entities.Task
import org.springframework.data.mongodb.repository.MongoRepository

interface TasksRepository : MongoRepository<Task, Int>
