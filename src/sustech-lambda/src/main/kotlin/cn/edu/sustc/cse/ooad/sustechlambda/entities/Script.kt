package cn.edu.sustc.cse.ooad.sustechlambda.entities

import org.springframework.data.mongodb.core.mapping.DBRef

class Script(
        val id: Int,
        var name: String,
        var description: String,
        var content: ScriptContent,
        @DBRef var author: User
)

