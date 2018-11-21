package cn.edu.sustc.cse.ooad.sustechlambda.security

import org.springframework.security.core.GrantedAuthority

class RoleAuthority(private val roleName: String) : GrantedAuthority {

    override fun getAuthority() = "ROLE_${this.roleName}"
}
