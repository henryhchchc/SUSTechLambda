package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.dtos.ScriptDto
import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.entities.Script
import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.persistence.ScriptsRepository
import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.services.IdentityService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI

@RestController
@RequestMapping("/api/scripts")
class ScriptsController
@Autowired constructor(
        private val repo: ScriptsRepository,
        private val identityService: IdentityService
) {

    @GetMapping("")
    fun getScripts() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @GetMapping("{id}")
    fun getScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PostMapping("")
    fun createScript(@RequestBody dto: ScriptDto) = dto.let {
        Script(0, it.name, it.description, it.content, identityService.getCurrentUser())
    }.also { this.repo.save(it) }.let {
        ResponseEntity.created(URI.create("/api/scripts/${it.id}")).body(it)
    }

    @PutMapping("{id}")
    fun updateScript(@PathVariable id: Int, @RequestBody dto: ScriptDto): ResponseEntity<*> {
        val scriptOpt = this.repo.findById(id)
        return when {
            scriptOpt.isPresent -> {
                scriptOpt.get().also {
                    it.name = dto.name
                    it.description = dto.description
                    it.content = dto.content
                    this.repo.save(it)
                }
                ResponseEntity.noContent().build<Script>()
            }
            else -> return ResponseEntity.notFound().build<String>()
        }
    }

    @DeleteMapping("{id}")
    fun deleteScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @PostMapping("{id}/run")
    fun runScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

}
