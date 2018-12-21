package cn.edu.sustc.cse.ooad.sustechlambda.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.MalformedJwtException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter
import java.security.Key
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtAuthenticationFilter(private val signingKey: Key) : OncePerRequestFilter() {

    override fun doFilterInternal(
            request: HttpServletRequest,
            response: HttpServletResponse,
            filterChain: FilterChain
    ) {
        try {
            extractToken(request)?.let {
                Jwts.parser()
                        .setSigningKey(this.signingKey)
                        .parseClaimsJws(it)
                        .body
            }?.let {
                JwtAuthenticationToken(it)
            }.also {
                SecurityContextHolder.getContext().authentication = it
            }
            filterChain.doFilter(request, response)
        } catch (ex: MalformedJwtException) {
            response.sendError(401, "Invalid access token")
        }

    }
}

private fun extractToken(request: HttpServletRequest) = request.getHeader("Authorization")?.let {
    when {
        it.startsWith("Bearer ") -> it.substring(7)
        else -> null
    }
}
