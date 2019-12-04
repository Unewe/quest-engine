package com.unewej.questengine.controller;

import com.unewej.questengine.service.UserService;
import com.unewej.questengine.seurity.CurrentUser;
import com.unewej.questengine.seurity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        if(userPrincipal == null) return ResponseEntity.notFound().build();
        else return ResponseEntity.ok(userPrincipal);
    }
}