package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class User {
    public int value;
    private UUID id;
    private String userName;
    private String passwordHash;
    private String displayName;
    private List<String> roles;


    public User(UUID id, String userName, String passwordHash, String displayName) {
        this.id = id;
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.displayName = displayName;
        this.roles = new ArrayList<>();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
