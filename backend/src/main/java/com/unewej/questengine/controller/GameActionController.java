package com.unewej.questengine.controller;

import com.unewej.questengine.model.Answer;
import com.unewej.questengine.model.GameAction;
import com.unewej.questengine.model.Question;
import com.unewej.questengine.payload.ApiResponse;
import com.unewej.questengine.service.GameActionService;
import com.unewej.questengine.service.GameService;
import com.unewej.questengine.service.QuestionService;
import com.unewej.questengine.seurity.CurrentUser;
import com.unewej.questengine.seurity.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;

@Controller
@RequestMapping("/api/game-action")
public class GameActionController {

    @Autowired
    QuestionService questionService;

    @Autowired
    GameActionService gameActionService;

    @Autowired
    GameService gameService;

    @GetMapping
    public ResponseEntity getQuestion(@CurrentUser UserPrincipal userPrincipal, @RequestParam Long gameId) {
        GameAction gameAction = gameActionService.findByUserIdAndGameId(userPrincipal.getId(), gameId).orElse(null);
        if(gameAction == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false, "Игра не начата"));
        }
        Question question = questionService.findByGameIdAndPosition(gameId, gameAction.getPosition()).get();
        return ResponseEntity.ok(new ApiResponse(true, question.getText()));
    }

    @PostMapping
    @Transactional
    public ResponseEntity validate(@CurrentUser UserPrincipal userPrincipal, @RequestBody String answer, @RequestParam Long gameId) {
        GameAction gameAction = gameActionService.findByUserIdAndGameId(userPrincipal.getId(), gameId).orElse(null);
        if(gameAction == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false, "Игра не начата"));
        }
        Question question = questionService.findByGameIdAndPosition(gameId, gameAction.getPosition()).get();
        List<Answer> answers = question.getAnswers();

        boolean result = false;
        for(Answer a : answers) {
            if (a.getText().toLowerCase().equals(answer.toLowerCase())) {
                result = true;
                break;
            }
        }
        if(result) {
            if(question.getGame().getQuestions().size() < question.getPosition()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(true, "Игра закончена!"));
            }
            gameAction.setPosition(gameAction.getPosition() + 1);
            gameActionService.save(gameAction);
            question.getGame().getQuestions().sort(Comparator.comparingInt(Question::getPosition));
            Question nextQuestion = question.getGame().getQuestions().get(question.getPosition());
            return ResponseEntity.ok(new ApiResponse(true, nextQuestion.getText()));
        } else return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(false, "Неверно"));
    }

    @PostMapping("/start")
    public ResponseEntity startGame(@CurrentUser UserPrincipal userPrincipal, @RequestBody Long gameId) {
        if(gameService.findById(gameId).isEmpty()) return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ApiResponse(false, "Такой игры не соществует"));
        GameAction started = gameActionService.findByUserIdAndGameIdAndTerminated(userPrincipal.getId(), gameId).orElse(null);
        if(started == null) {
            GameAction gameAction = new GameAction();
            gameAction.setUserId(userPrincipal.getId());
            gameAction.setGameId(gameId);
            gameActionService.save(gameAction);
            return ResponseEntity.ok(new ApiResponse(true, "Начинаем новую игру"));
        }
        return ResponseEntity.ok(new ApiResponse(true, "Продолжение игры"));
    }
}
