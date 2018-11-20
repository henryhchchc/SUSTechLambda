package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.controllers

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/scripts")
class ScriptsController {

    @GetMapping("")
    fun getScripts() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @GetMapping("{id}")
    fun getScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PostMapping("")
    fun createScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PutMapping("{id}")
    fun updateScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @DeleteMapping("{id}")
    fun deleteScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PostMapping("{id}/run")
    fun runScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

}
