package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.ScriptContent

data class ScriptDto(
        val name: String,
        val description: String,
        val content: ScriptContent
)
