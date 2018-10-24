package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.security;

import org.springframework.security.core.GrantedAuthority;

public class RoleAuthority implements GrantedAuthority {

    private final String roleName;

    public RoleAuthority(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String getAuthority() {
        return String.format("ROLE_%s", this.roleName);
    }
}
