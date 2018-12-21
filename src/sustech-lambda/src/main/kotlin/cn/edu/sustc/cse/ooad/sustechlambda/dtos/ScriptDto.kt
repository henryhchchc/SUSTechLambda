package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.Script
import cn.edu.sustc.cse.ooad.sustechlambda.entities.ScriptContent
import java.util.*

data class ScriptDto(
        val id: UUID,
        val name: String,
        val description: String,
        val content: ScriptContent,
        val author: UserBriefDto
)

fun Script.toDto() = ScriptDto(this.id, this.name, this.description, this.content, this.author.toBriefDto())
