package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.security

import io.jsonwebtoken.Claims
import org.springframework.security.authentication.AbstractAuthenticationToken
import org.springframework.security.core.GrantedAuthority

class JwtAuthenticationToken(claims: Claims) : AbstractAuthenticationToken(null) {

    private val principal: SLUserDetails?
    private val roleAuthorities: List<RoleAuthority>

    init {
        this.isAuthenticated = claims.subject != null
        this.principal = claims.subject?.let { SLUserDetails(it) }
        val roles = claims.get<String>("Roles", String::class.java)
        this.roleAuthorities = roles?.split(",")!!.map { RoleAuthority(it) }
    }

    override fun getAuthorities() = this.roleAuthorities.map { it as GrantedAuthority }

    override fun getCredentials() = super.getName()!!

    override fun getPrincipal() = this.principal
}
