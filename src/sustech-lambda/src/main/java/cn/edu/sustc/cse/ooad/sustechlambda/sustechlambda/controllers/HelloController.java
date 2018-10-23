package cn.edu.sustc.cse.ooad.sustechlambda.sustechlambda.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test/")
public class HelloController {

    @GetMapping("hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("It works");
    }

    @PostMapping("create")
    public ResponseEntity<String> create(String content) {
        return ResponseEntity.ok("Got " + content);
    }
}
