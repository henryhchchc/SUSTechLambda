package cn.edu.sustc.cse.ooad.sustechlambda.services

import org.springframework.stereotype.Service

private val charset: String = (('0'..'9') + ('a'..'z') + ('A'..'Z')).joinToString()

@Service
class PasswordGenerator {

    fun generatePassword(length: Int) =
            StringBuilder().apply {
                kotlin.repeat(length) {
                    append(charset.random())
                }
            }.toString()
}
