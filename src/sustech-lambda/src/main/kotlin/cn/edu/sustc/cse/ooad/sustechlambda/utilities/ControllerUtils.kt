package cn.edu.sustc.cse.ooad.sustechlambda.utilities

import cn.edu.sustc.cse.ooad.sustechlambda.dtos.PagingResult
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.http.ResponseEntity

fun <T, ID> pagingQuery(pageIndex: Int, pageSize: Int, repo: MongoRepository<T, ID>) = pagingQuery(pageIndex, pageSize, repo) { it }

fun <T, ID, U> pagingQuery(pageIndex: Int, pageSize: Int, repo: MongoRepository<T, ID>, dtoMapper: (T) -> U) = when {
    !isPagingParametersValid(pageIndex, pageSize) -> ResponseEntity.badRequest().body("Invalid page index or page size.")
    else -> PagingResult(
            pageSize,
            repo.count(),
            content = PageRequest.of(pageIndex, pageSize).let { repo.findAll(it) }.content.map(dtoMapper)
    ).let { ResponseEntity.ok(it) }
}

private fun isPagingParametersValid(pageIndex: Int, pageSize: Int) = pageIndex >= 0 && pageSize > 0

fun <T, ID> getById(id: ID, repo: MongoRepository<T, ID>) = getById(id, repo) { it }

fun <T, ID, U> getById(id: ID, repo: MongoRepository<T, ID>, dtoMapper: (T) -> U) = repo.findById(id)
        .map(dtoMapper compose { ResponseEntity.ok(it) })
        .orElseGet { ResponseEntity.notFound().build() }!!

infix fun <T, U, V> ((T) -> U).compose(right: (U) -> V): (T) -> V = { it.let(this).let(right) }
