package com.unewej.questengine.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/game-action")
public class GameActionController {

    @PostMapping
    public ResponseEntity validate(@RequestBody String answer) {

        return ResponseEntity.ok().build();
    }
}
