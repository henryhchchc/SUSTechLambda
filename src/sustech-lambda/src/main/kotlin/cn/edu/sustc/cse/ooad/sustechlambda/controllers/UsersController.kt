package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.UserDto
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
import org.springframework.web.bind.annotation.*

@RestController
@Api(tags = ["Users APIs"])
@RequestMapping("/api/users/")
class UsersController
@Autowired constructor(private val repo: UsersRepository) {

    @ApiOperation("Register a user")
    @PostMapping("register")
    fun register() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

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
