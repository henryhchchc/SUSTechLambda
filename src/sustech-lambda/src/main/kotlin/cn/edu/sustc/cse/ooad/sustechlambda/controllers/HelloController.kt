package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/test/")
class HelloController {

    @GetMapping("hello")
    fun hello(): ResponseEntity<String> = ResponseEntity.ok("It works")

    @PostMapping("create")
    fun create(content: String) = ResponseEntity.ok("Got $content")
}
