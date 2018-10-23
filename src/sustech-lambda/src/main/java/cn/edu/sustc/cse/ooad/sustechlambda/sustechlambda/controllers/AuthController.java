package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.controllers;

import cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.dtos.LoginDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody LoginDto dto) {

        String token =
                Jwts.builder()
                        .setSubject("henry")
                        .signWith(SignatureAlgorithm.HS512, "my super signing key".getBytes())
                        .compact();
        return ResponseEntity.ok(token);
    }
}
