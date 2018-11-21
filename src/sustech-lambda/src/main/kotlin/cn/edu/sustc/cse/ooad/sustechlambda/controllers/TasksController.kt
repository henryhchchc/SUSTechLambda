package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/tasks")
class TasksController {

    @GetMapping("")
    fun getTasks() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @GetMapping("{id}")
    fun getTaskDetail() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

}
