package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.LoginDto
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.Authorization
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@Api(tags = ["Authentication APIs"])
@RequestMapping("/api/auth/")
class AuthController {

    @ApiOperation("Login")
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
                        ResponseEntity.ok(mapOf(
                                "access_token" to it
                        ))
                    }

    @ApiOperation("Logout", authorizations = [Authorization("Bearer")])
    @PostMapping("logout")
    fun logout() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)
}
