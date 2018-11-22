package cn.edu.sustc.cse.ooad.sustechlambda.config

import cn.edu.sustc.cse.ooad.sustechlambda.security.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

import javax.servlet.http.HttpServletResponse

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        jsr250Enabled = true
)
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint { _, res, _ -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED) }
                .and()
                .addFilterAfter(JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)
                .authorizeRequests()
                .antMatchers("/api/identity/login", "/api/users/register").permitAll()
                .antMatchers("/api/**").authenticated()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()
}
