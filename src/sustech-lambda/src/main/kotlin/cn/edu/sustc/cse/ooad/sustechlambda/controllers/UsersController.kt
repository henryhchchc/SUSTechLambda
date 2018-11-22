package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.UserDto
import cn.edu.sustc.cse.ooad.sustechlambda.dtos.UserRegisterDto
import cn.edu.sustc.cse.ooad.sustechlambda.entities.User
import cn.edu.sustc.cse.ooad.sustechlambda.persistence.UsersRepository
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

@RestController
@Api(tags = ["Users APIs"])
@RequestMapping("/api/users/")
class UsersController
@Autowired constructor(
        private val repo: UsersRepository,
        private val passwordEncoder: PasswordEncoder
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

    @ApiOperation("Query users", authorizations = [Authorization("Bearer")])
    @GetMapping("")
    fun query(
            @ApiParam("Page index, starting at 0", required = false)
            @RequestParam("page_idx", defaultValue = "0") pageIndex: Int,
            @ApiParam("Page size")
            @RequestParam("page_size", defaultValue = "10") pageSize: Int
    ) = pagingQuery(pageIndex, pageSize, this.repo) {
        UserDto(it.id, it.userName, it.displayName, it.roles)
    }

    @ApiOperation("Get detail of a user", authorizations = [Authorization("Bearer")], response = UserDto::class)
    @GetMapping("{id}")
    fun getUserDetail(@PathVariable id: Int) = getById(id, this.repo) {
        UserDto(it.id, it.userName, it.displayName, it.roles)
    }

    @ApiOperation("Update user", authorizations = [Authorization("Bearer")])
    @PutMapping("{id}")
    fun updateUser() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @ApiOperation("Update advanced options for a user", authorizations = [Authorization("Bearer")])
    @PutMapping("{id}/advanced")
    fun updateUserAdvancedOptions() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @ApiOperation("Reset password of a user")
    @PostMapping("{id}/reset-password")
    fun resetPassword() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)
}
