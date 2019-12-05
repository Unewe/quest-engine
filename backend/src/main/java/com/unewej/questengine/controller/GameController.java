package com.unewej.questengine.controller;

import com.unewej.questengine.config.OrikaMapper;
import com.unewej.questengine.model.*;
import com.unewej.questengine.payload.Game;
import com.unewej.questengine.repository.QuestionRepository;
import com.unewej.questengine.service.GameService;
import com.unewej.questengine.service.UserService;
import com.unewej.questengine.seurity.CurrentUser;
import com.unewej.questengine.seurity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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

    @Autowired
    OrikaMapper orikaMapper;

    @GetMapping
    public ResponseEntity<?> getGames() {
        return ResponseEntity.ok(orikaMapper.mapAsList(gameService.findAll(), Game.class));
    }

    @GetMapping("/new")
    public ResponseEntity<?> createOrUpdate(@CurrentUser UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        GameEntity newGameEntity = new GameEntity();
        newGameEntity.setName("new +");
        newGameEntity.setDescription("new +");
        newGameEntity.setDate(new Date());
        newGameEntity.setUserId(userPrincipal.getId());


        CategoryEntity categoryEntity = new CategoryEntity();

        GameStatisticEntity gameStatistic = new GameStatisticEntity();
        gameStatistic.setGame(newGameEntity);
        gameStatistic.setCategory(categoryEntity);
        gameStatistic.setCountPlayed(0L);
        gameStatistic.setIsBlocked(false);
        gameStatistic.setIsPrivate(false);
        gameStatistic.setMark(0.0F);

        categoryEntity.setGameStatistic(new ArrayList<>(){{add(gameStatistic);}});
        categoryEntity.setName("Test Game");


        newGameEntity.setGameStatistic(gameStatistic);


        AnswerEntity answerEntity = new AnswerEntity();
        HintEntity hintEntity = new HintEntity();


        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setGame(newGameEntity);
        questionEntity.setPosition(1);
        questionEntity.setText("Test Question");

        answerEntity.setQuestion(questionEntity);
        answerEntity.setText("Test Answer");

        hintEntity.setQuestion(questionEntity);
        hintEntity.setText("Test Hint");

        questionEntity.setAnswers(new ArrayList<>() {{this.add(answerEntity);}});
        questionEntity.setHints(new ArrayList<>(){{this.add(hintEntity);}});


        newGameEntity.setQuestions(new ArrayList<>(){{this.add(questionEntity);}});

        return ResponseEntity.ok(gameService.save(newGameEntity));
    }
}
