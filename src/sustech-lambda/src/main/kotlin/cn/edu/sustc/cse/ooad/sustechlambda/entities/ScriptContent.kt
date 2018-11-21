package cn.edu.sustc.cse.ooad.sustechlambda.entities

data class ScriptContent(
        val language: String,
        val code: String,
        val parameters: List<ScriptParameterInfo>
)
