package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.LoginDto
import cn.edu.sustc.cse.ooad.sustechlambda.dtos.UserBriefDto
import cn.edu.sustc.cse.ooad.sustechlambda.dtos.toBriefDto
import cn.edu.sustc.cse.ooad.sustechlambda.services.IdentityService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.Authorization
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.annotation.security.RolesAllowed

@RestController
@Api(tags = ["Identity APIs"])
@RequestMapping("/api/identity/")
class IdentityController
@Autowired constructor(private val identityService: IdentityService) {

    @ApiOperation("Login")
    @PostMapping("login")
    fun login(@RequestBody dto: LoginDto) =
            this.identityService.authenticate(dto.userName, dto.password)
                    ?.let {
                        ResponseEntity.ok(mapOf(
                                "access_token" to it
                        ))
                    } ?: ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username of password")


    @RolesAllowed("USER", "DESIGNER", "ADMIN")
    @ApiOperation("Get current user", authorizations = [Authorization("Bearer")], response = UserBriefDto::class)
    @GetMapping("profile")
    fun getCurrentUser() = this.identityService.getCurrentUser()!!.let { ResponseEntity.ok(it.toBriefDto()) }


    @ApiOperation("Logout", authorizations = [Authorization("Bearer")])
    @PostMapping("logout")
    fun logout() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)
}
