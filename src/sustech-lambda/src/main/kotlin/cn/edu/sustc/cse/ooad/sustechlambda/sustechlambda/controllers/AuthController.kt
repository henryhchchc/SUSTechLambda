package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.dtos.LoginDto
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth/")
class AuthController {

    @PostMapping("login")
    fun login(@RequestBody dto: LoginDto) =
            Jwts.builder()
                    .setSubject("henry")
                    .addClaims(mapOf(
                            "Roles" to "USER,DESIGNER"
                    ))
                    .signWith(SignatureAlgorithm.HS512, "my super signing key".toByteArray())
                    .compact()
                    .let {
                        ResponseEntity.ok(it)
                    }

    @PostMapping("logout")
    fun logout() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)
}
