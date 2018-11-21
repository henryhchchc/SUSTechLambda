package cn.edu.sustc.cse.ooad.sustechlambda.persistence

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Script
import org.springframework.data.mongodb.repository.MongoRepository

interface ScriptsRepository : MongoRepository<Script, Int>
