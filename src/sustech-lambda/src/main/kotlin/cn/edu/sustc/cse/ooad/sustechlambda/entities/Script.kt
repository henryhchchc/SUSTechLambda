package cn.edu.sustc.cse.ooad.sustechlambda.entities

import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

class Script(
        val id: UUID,
        var name: String,
        var description: String,
        var content: ScriptContent,
        @DBRef var author: User
)

