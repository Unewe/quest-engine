package com.unewej.questengine.controller;

import com.unewej.questengine.model.*;
import com.unewej.questengine.repository.GameRepository;
import com.unewej.questengine.repository.QuestionRepository;
import com.unewej.questengine.service.GameService;
import com.unewej.questengine.seurity.CurrentUser;
import com.unewej.questengine.seurity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Date;

@Controller
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    GameService gameService;

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping
    public ResponseEntity<?> getGames() {
//        Game game = gameService.findById(1l).get();
        return ResponseEntity.ok(gameService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createOrUpdate(@CurrentUser UserPrincipal userPrincipal, @RequestBody Game game) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Game newGame = new Game();
        newGame.setName("new");
        newGame.setDescription("new");
        newGame.setDate(new Date());
        newGame.setUserId(userPrincipal.getId());


        Category category = new Category();

        GameStatistic gameStatistic = new GameStatistic();
        gameStatistic.setGame(newGame);
        gameStatistic.setCategory(category);
        gameStatistic.setCountPlayed(0L);
        gameStatistic.setIsBlocked(false);
        gameStatistic.setIsPrivate(false);
        gameStatistic.setMark(0.0F);

        category.setGameStatistic(gameStatistic);
        category.setName("Test Game");


        newGame.setGameStatistic(gameStatistic);


        Answer answer = new Answer();
        Hint hint = new Hint();


        Question question = new Question();
        question.setGame(newGame);
        question.setPosition(1);
        question.setText("Test Question");

        answer.setQuestion(question);
        answer.setText("Test Answer");

        hint.setQuestion(question);
        hint.setText("Test Hint");

        question.setAnswers(new ArrayList<>() {{this.add(answer);}});
        question.setHints(new ArrayList<>(){{this.add(hint);}});


        newGame.setQuestions(new ArrayList<>(){{this.add(question);}});
        gameService.save(newGame);
        return ResponseEntity.ok(null);
    }
}
