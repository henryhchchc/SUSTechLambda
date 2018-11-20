package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users/")
class UsersController {

    @PostMapping("register")
    fun register() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @GetMapping("")
    fun getUsers() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @GetMapping("{id}")
    fun getUserDetail() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PutMapping("{id}")
    fun updateUser() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PutMapping("{id}/advanced")
    fun updateUserAdvancedOptions() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PostMapping("{id}/reset-password")
    fun resetPassword() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)
}
