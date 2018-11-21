package cn.edu.sustc.cse.ooad.sustechlambda.dtos

import kotlin.math.ceil

class PagingResult<T>(
        val pageSize: Int,
        totalNumber: Long,
        val content: List<T>
) {
    val totalPages = ceil(totalNumber.toDouble() / pageSize).toInt()
}
