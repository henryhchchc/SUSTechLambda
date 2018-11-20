package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.security

import org.springframework.security.core.userdetails.UserDetails

class SLUserDetails(private val subject: String) : UserDetails {

    override fun getAuthorities() = null

    override fun getPassword() = null

    override fun getUsername() = this.subject

    override fun isAccountNonExpired() = true

    override fun isAccountNonLocked() = true

    override fun isCredentialsNonExpired() = true

    override fun isEnabled() = true
}
