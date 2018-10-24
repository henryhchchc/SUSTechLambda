package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.security;

import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {

    private final SLUserDetails principal;
    private final List<RoleAuthority> roleAuthorities;

    public JwtAuthenticationToken(Claims claims) {
        super(null);
        String subject = claims.getSubject();
        if (subject != null) {
            this.principal = new SLUserDetails(subject);
            this.setAuthenticated(true);
        } else {
            this.principal = null;
        }

        String roles = claims.get("Roles", String.class);
        if (roles != null) {
            this.roleAuthorities
                    = Arrays.stream(roles.split(","))
                    .map(RoleAuthority::new)
                    .collect(Collectors.toList());
        } else {
            this.roleAuthorities = Collections.emptyList();
        }
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return this.roleAuthorities
                .stream()
                .map(a -> (GrantedAuthority) a)
                .collect(Collectors.toList());
    }

    @Override
    public Object getCredentials() {
        return super.getName();
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}
