package com.unewej.questengine.service;

import com.unewej.questengine.model.GameEntity;
import com.unewej.questengine.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    GameRepository gameRepository;

    public List<GameEntity> findAll() {
        return gameRepository.findAll();
    }

    public GameEntity save(GameEntity gameEntity) {
        return gameRepository.save(gameEntity);
    }

    public Optional<GameEntity> findById(Long id) {
        return gameRepository.findById(id);
    }
}
