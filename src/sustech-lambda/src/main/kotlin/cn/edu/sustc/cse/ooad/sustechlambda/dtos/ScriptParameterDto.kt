package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import cn.edu.sustc.cse.ooad.sustechlambda.entities.ParameterType

data class ScriptParameterDto(
        val name: String,
        val type: ParameterType,
        val value: String
)
