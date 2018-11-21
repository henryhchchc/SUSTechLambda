package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.entities

class Script(
        val id: Int,
        var name: String,
        var description: String,
        var content: ScriptContent,
        var author: User
)

