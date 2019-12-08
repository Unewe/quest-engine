package com.unewej.questengine.service;

import com.unewej.questengine.model.GameAction;
import com.unewej.questengine.repository.GameActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameActionService {
    @Autowired
    GameActionRepository gameActionRepository;

    public Optional<GameAction> findByUserIdAndGameId(Long userId, Long gameId) {
        return gameActionRepository.findByUserIdAndGameId(userId, gameId);
    }

    public GameAction save(GameAction gameAction) {
        return gameActionRepository.save(gameAction);
    }

    public Optional<GameAction> findByUserIdAndGameIdAndTerminated(Long userId, Long gameId) {
        return gameActionRepository.findByUserIdAndGameIdAndTerminated(userId, gameId, false);
    }
}
