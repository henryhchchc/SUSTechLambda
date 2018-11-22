package cn.edu.sustc.cse.ooad.sustechlambda.services

import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import cn.edu.sustc.cse.ooad.sustechlambda.persistence.UsersRepository
import cn.edu.sustc.cse.ooad.sustechlambda.security.JwtAuthenticationToken
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class IdentityServiceImpl
@Autowired constructor(
        private val passwordEncoder: PasswordEncoder,
        private val usersRepo: UsersRepository
) : IdentityService {

    override fun authenticate(userName: String, password: String): String? =
            this.usersRepo.findByUserName(userName).map {
                when {
                    validatePassword(it, password) -> generateAccessToken(it)
                    else -> null
                }
            }.orElse(null)

    override fun generateAccessToken(user: User): String =
            Jwts.builder()
                    .setSubject(user.userName)
                    .setId(user.id.toString())
                    .addClaims(mapOf(
                            "Roles" to user.roles.joinToString(",")
                    ))
                    .signWith(SignatureAlgorithm.HS512, "SUSTech lambda signing key".toByteArray())
                    .compact()


    private fun validatePassword(it: User, password: String) =
            this.passwordEncoder.matches(password, it.passwordHash)


    override fun getCurrentUser() = SecurityContextHolder.getContext()
            .authentication?.let { it as JwtAuthenticationToken }?.let { it.name }?.let {
        this.usersRepo.findByUserName(it).orElse(null)
    }
}
