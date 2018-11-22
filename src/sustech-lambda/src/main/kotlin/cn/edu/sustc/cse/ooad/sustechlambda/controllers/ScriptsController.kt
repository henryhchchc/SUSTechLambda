package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.ScriptDto
import cn.edu.sustc.cse.ooad.sustechlambda.entities.Script
import cn.edu.sustc.cse.ooad.sustechlambda.persistence.ScriptsRepository
import cn.edu.sustc.cse.ooad.sustechlambda.services.IdentityService
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
import java.net.URI
import java.util.*
import javax.annotation.security.RolesAllowed

@RestController
@Api(tags = ["Scripts APIs"])
@RequestMapping("/api/scripts")
class ScriptsController
@Autowired constructor(
        private val repo: ScriptsRepository,
        private val identityService: IdentityService
) {

    @RolesAllowed("USER", "DESIGNER", "ADMIN")
    @ApiOperation("Query scrips", authorizations = [Authorization("Bearer")])
    @GetMapping("")
    fun query(
            @ApiParam("Page index, starting at 0")
            @RequestParam("page_idx", defaultValue = "0") pageIndex: Int,
            @ApiParam("Page size")
            @RequestParam("page_size", defaultValue = "10") pageSize: Int
    ) = pagingQuery(pageIndex, pageSize, this.repo)

    @RolesAllowed("USER", "DESIGNER", "ADMIN")
    @ApiOperation("Get a script", authorizations = [Authorization("Bearer")])
    @GetMapping("{id}")
    fun getScript(@PathVariable id: UUID) = getById(id, this.repo)

    @RolesAllowed("DESIGNER")
    @ApiOperation("Create script", authorizations = [Authorization("Bearer")])
    @PostMapping("")
    fun createScript(@RequestBody dto: ScriptDto) = dto.let {
        Script(
                UUID.randomUUID(),
                it.name,
                it.description,
                it.content,
                identityService.getCurrentUser()!!
        )
    }.let { this.repo.save(it) }.let {
        ResponseEntity.created(URI.create("/api/scripts/${it.id}")).body(it)
    }

    @RolesAllowed("DESIGNER")
    @ApiOperation("Update a script", authorizations = [Authorization("Bearer")])
    @PutMapping("{id}")
    fun updateScript(@PathVariable id: UUID, @RequestBody dto: ScriptDto): ResponseEntity<*> {
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

    @RolesAllowed("DESIGNER")
    @ApiOperation("Delete a script", authorizations = [Authorization("Bearer")])
    @DeleteMapping("{id}")
    fun deleteScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

    @RolesAllowed("USER")
    @ApiOperation("Run a script", authorizations = [Authorization("Bearer")])
    @PostMapping("{id}/run")
    fun runScript() = ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(null)

}
