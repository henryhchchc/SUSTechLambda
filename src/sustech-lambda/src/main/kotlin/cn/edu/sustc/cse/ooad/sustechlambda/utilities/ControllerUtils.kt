package cn.edu.sustc.cse.ooad.sustechlambda.utilities

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.PagingResult
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.http.ResponseEntity

fun <T, ID> pagingQuery(pageIndex: Int, pageSize: Int, repo: MongoRepository<T, ID>) = when {
    pageIndex < 0 || pageSize <= 0 -> ResponseEntity.badRequest().body("Invalid page index or page size.")
    else -> PagingResult(
            pageSize,
            repo.count(),
            content = PageRequest.of(pageIndex, pageSize).let { repo.findAll(it) }.content
    ).let { ResponseEntity.ok(it) }
}
