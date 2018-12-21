package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.ScriptContent

data class ScriptCreationDto(
        val name: String,
        val description: String,
        val content: ScriptContent
)
