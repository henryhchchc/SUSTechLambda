package cn.edu.sustc.cse.ooad.sustechlambda.security

import io.jsonwebtoken.Jwts
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtAuthenticationFilter : OncePerRequestFilter() {

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(request: HttpServletRequest,
                                  response: HttpServletResponse,
                                  filterChain: FilterChain) {
        extractToken(request)?.let {
            Jwts.parser()
                    .setSigningKey("my super signing key".toByteArray())
                    .parseClaimsJws(it)
                    .body
        }?.let {
            JwtAuthenticationToken(it)
        }.also {
            SecurityContextHolder.getContext().authentication = it
        }

        filterChain.doFilter(request, response)
    }

    private fun extractToken(request: HttpServletRequest) =
            request.getHeader("Authorization")?.let {
                when {
                    it.startsWith("Bearer ") -> it.substring(7)
                    else -> null
                }
            }
}
