package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.toDto
import cn.edu.sustc.cse.ooad.sustechlambda.persistence.TasksRepository
import cn.edu.sustc.cse.ooad.sustechlambda.services.IdentityService
import cn.edu.sustc.cse.ooad.sustechlambda.services.TaskServices
import cn.edu.sustc.cse.ooad.sustechlambda.utilities.pagingQuery
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.Authorization
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.annotation.security.RolesAllowed


@RestController
@Api(tags = ["Tasks APIs"])
@RequestMapping("/api/tasks")
class TasksController
@Autowired constructor(private val repo: TasksRepository,
                       private val taskServices: TaskServices,
                       private val identityService: IdentityService) {

    @RolesAllowed("ADMIN")
    @ApiOperation("Query tasks", authorizations = [Authorization("Bearer")])
    @GetMapping("")
    fun query(
            @ApiParam("Page index, starting at 0")
            @RequestParam("page_idx", defaultValue = "0") pageIndex: Int,
            @ApiParam("Page size")
            @RequestParam("page_size", defaultValue = "10") pageSize: Int
    ) = pagingQuery(pageIndex, pageSize, this.repo) { it.toDto(this.taskServices.getStatus(it), this.taskServices.getOutput(it)) }

    @RolesAllowed("USER", "DESIGNER", "ADMIN")
    @ApiOperation("Get task", authorizations = [Authorization("Bearer")])
    @GetMapping("{id}")
    fun getTaskDetail(@PathVariable id: UUID): ResponseEntity<*> {
        val entityOptional = this.repo.findById(id)
        return if (entityOptional.isPresent) {
            val task = entityOptional.get()
            task.endTime = this.taskServices.getEndTime(task)
            this.repo.save(task)
            ResponseEntity.ok(task.toDto(this.taskServices.getStatus(task), this.taskServices.getOutput(task)))
        } else ResponseEntity.notFound().build<String>()
    }


    @RolesAllowed("USER")
    @ApiOperation("Get tasks created by current user.", authorizations = [Authorization("Bearer")])
    @GetMapping("mine")
    fun getMyTasks(): ResponseEntity<*> {
        val currentUser = this.identityService.getCurrentUser()!!
        return this.repo.findAll().filter { it.owner.id == currentUser.id }
                .map { it.toDto(this.taskServices.getStatus(it), this.taskServices.getOutput(it)) }
                .let { ResponseEntity.ok(it) }
    }
}

