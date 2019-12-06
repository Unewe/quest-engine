package com.unewej.questengine.controller;

import com.unewej.questengine.config.OrikaMapper;
import com.unewej.questengine.model.*;
import com.unewej.questengine.payload.ApiResponse;
import com.unewej.questengine.repository.QuestionRepository;
import com.unewej.questengine.service.GameService;
import com.unewej.questengine.service.QuestionService;
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

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    GameService gameService;

    @Autowired
    QuestionService questionService;

    @Autowired
    OrikaMapper orikaMapper;

    @GetMapping
    public ResponseEntity<?> getGames() {
        List<Game> games = orikaMapper.mapAsList(gameService.findAll(), Game.class);
        return ResponseEntity.ok(games);
    }

    @PostMapping("/")
    public ResponseEntity<?> createOrUpdate(@CurrentUser UserPrincipal userPrincipal, @RequestBody Game requestGame) {
        if (userPrincipal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Game game = gameService.findById(requestGame.getId()).orElse(requestGame);

        if (game.getId() == null) {
            GameStatistic gameStatistic = new GameStatistic();
            gameStatistic.setGame(game);
            game.setGameStatistic(gameStatistic);
            game.setUserId(userPrincipal.getId());
        } else {
            if (!game.getUserId().equals(userPrincipal.getId())) {
                //Жулики могут попробовать изменить чужую игру. Оскорбляем жуликов!
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse(
                        false, "Ублюдок, мать твою, а ну иди сюда говно собачье," +
                        " решил ко мне лезть? Ты, засранец вонючий, мать твою, а? " +
                        "Ну иди сюда, попробуй меня трахнуть, я тебя сам трахну ублюдок, " +
                        "онанист чертов, будь ты проклят, иди идиот, трахать тебя и всю семью, " +
                        "говно собачье, жлоб вонючий, дерьмо, сука, падла, иди сюда, мерзавец, " +
                        "негодяй, гад, иди сюда ты - говно, ЖОПА!"));
            }
            questionService.deleteByGameId(game.getId());
            game.getQuestions().clear();
        }
        requestGame.getQuestions().forEach(question -> {
            question.getAnswers().forEach(answer -> answer.setQuestion(question));
            question.getHints().forEach(hint -> hint.setQuestion(question));
            question.setGame(game);
        });

        return ResponseEntity.ok(new ApiResponse(true, "Успешно сохранено"));
    }
}
