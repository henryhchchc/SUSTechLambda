package cn.edu.sustc.cse.ooad.sustechlambda.controllers

import cn.edu.sustc.cse.ooad.sustechlambda.persistence.TasksRepository
import cn.edu.sustc.cse.ooad.sustechlambda.utilities.getById
import cn.edu.sustc.cse.ooad.sustechlambda.utilities.pagingQuery
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.Authorization
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.annotation.security.RolesAllowed


@RestController
@Api(tags = ["Tasks APIs"])
@RequestMapping("/api/tasks")
class TasksController
@Autowired constructor(private val repo: TasksRepository) {

    @RolesAllowed("ADMIN")
    @ApiOperation("Query tasks", authorizations = [Authorization("Bearer")])
    @GetMapping("")
    fun query(
            @ApiParam("Page index, starting at 0")
            @RequestParam("page_idx", defaultValue = "0") pageIndex: Int,
            @ApiParam("Page size")
            @RequestParam("page_size", defaultValue = "10") pageSize: Int
    ) = pagingQuery(pageIndex, pageSize, this.repo)

    @RolesAllowed("USER", "DESIGNER", "ADMIN")
    @ApiOperation("Get task", authorizations = [Authorization("Bearer")])
    @GetMapping("{id}")
    fun getTaskDetail(@PathVariable id: UUID) = getById(id, this.repo)

}
