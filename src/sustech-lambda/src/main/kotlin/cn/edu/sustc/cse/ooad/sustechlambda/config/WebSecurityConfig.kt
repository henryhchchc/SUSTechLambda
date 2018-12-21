package cn.edu.sustc.cse.ooad.sustechlambda.config

import cn.edu.sustc.cse.ooad.sustechlambda.security.JwtAuthenticationFilter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import javax.servlet.http.HttpServletResponse

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        jsr250Enabled = true
)
class WebSecurityConfig
@Autowired constructor(private val config: AccessTokenConfig) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http
                .cors().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint { _, res, _ -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED) }
                .and()
                .addFilterAfter(JwtAuthenticationFilter(this.config.getKey()), UsernamePasswordAuthenticationFilter::class.java)
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/api/identity/login", "/api/users/register").permitAll()
                .antMatchers("/api/**").authenticated()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun corsConfiger(): WebMvcConfigurer = CorsConfiger()
}

private class CorsConfiger : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:3000",
                        "http://127.0.0.1:3000",
                        "http://[:1]:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
    }
}
