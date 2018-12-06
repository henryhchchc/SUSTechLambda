package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.UserDto
import cn.edu.sustc.cse.ooad.sustechlambda.dtos.UserRegisterDto
import cn.edu.sustc.cse.ooad.sustechlambda.dtos.toDto
import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import cn.edu.sustc.cse.ooad.sustechlambda.persistence.UsersRepository
import cn.edu.sustc.cse.ooad.sustechlambda.services.PasswordGenerator
import cn.edu.sustc.cse.ooad.sustechlambda.utilities.getById
import cn.edu.sustc.cse.ooad.sustechlambda.utilities.pagingQuery
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.Authorization
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import java.net.URI
import java.util.*
import javax.annotation.security.RolesAllowed

@RestController
@Api(tags = ["Users management APIs"])
@RequestMapping("/api/users/")
class UsersController
@Autowired constructor(
        private val repo: UsersRepository,
        private val passwordEncoder: PasswordEncoder,
        private val passwordGenerator: PasswordGenerator
) {

    @ApiOperation("Register a user")
    @PostMapping("register")
    fun register(@RequestBody dto: UserRegisterDto): ResponseEntity<*> {
        return when {
            this.repo.findByUserName(dto.userName).isPresent -> ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists")
            !validateRegisterDto(dto) -> ResponseEntity.badRequest().body("Invalid request")
            else -> dto.let {
                User(
                        UUID.randomUUID(),
                        it.userName,
                        this.passwordEncoder.encode(it.password),
                        it.displayName,
                        it.roles
                )
            }.let { this.repo.save(it) }.let { ResponseEntity.created(URI.create("")).body("Welcome") }
        }

    }

    private fun validateRegisterDto(dto: UserRegisterDto) = dto.roles.all { it in setOf("USER", "DESIGNER", "ADMIN") }

    @RolesAllowed("ADMIN")
    @ApiOperation("Query users", authorizations = [Authorization("Bearer")])
    @GetMapping("")
    fun query(
            @ApiParam("Page index, starting at 0", required = false)
            @RequestParam("page_idx", defaultValue = "0") pageIndex: Int,
            @ApiParam("Page size")
            @RequestParam("page_size", defaultValue = "10") pageSize: Int
    ) = pagingQuery(pageIndex, pageSize, this.repo) { it.toDto() }

    @RolesAllowed("ADMIN")
    @ApiOperation("Get detail of a user", authorizations = [Authorization("Bearer")], response = UserDto::class)
    @GetMapping("{id}")
    fun getUserDetail(@PathVariable id: UUID) = getById(id, this.repo) { it.toDto() }

    @RolesAllowed("ADMIN")
    @ApiOperation("Update user", authorizations = [Authorization("Bearer")])
    @PutMapping("{id}")
    fun updateUser() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @RolesAllowed("ADMIN")
    @ApiOperation("Update advanced options for a user", authorizations = [Authorization("Bearer")])
    @PutMapping("{id}/advanced")
    fun updateUserAdvancedOptions() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @RolesAllowed("ADMIN")
    @ApiOperation("Reset password of a user", authorizations = [Authorization("Bearer")])
    @PostMapping("{id}/reset-password")
    fun resetPassword(
            @PathVariable id: UUID
    ): ResponseEntity<*> {
        val userOpt = this.repo.findById(id)
        return if (userOpt.isPresent) {
            val newPassword = this.passwordGenerator.generatePassword(8)
            val user = userOpt.get()
            val passwordHash = this.passwordEncoder.encode(newPassword)
            user.passwordHash = passwordHash
            this.repo.save(user)
            ResponseEntity.ok(mapOf(
                    "newPassword" to newPassword
            ))
        } else ResponseEntity.notFound().build<String>()
    }
}
