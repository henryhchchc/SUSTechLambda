package cn.edu.sustc.cse.ooad.sustechlambda.entities

import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*


class Script(
        val id: UUID,
        var name: String,
        var description: String,
        var content: ScriptContent,
        @DBRef var author: User
) {
    fun validateParameters(parameters: Set<ScriptRunParameter>) = parameters.map { ScriptParameterInfo(it.name, it.type) }.toSet().all { it in this.content.parameters }
            && parameters.filter { it.type == ParameterType.NUMBER }.all { it.value.isNumerical() }
}

private fun String.isNumerical() = try {
    this.toDouble()
    true
} catch (ex: NumberFormatException) {
    false
}


