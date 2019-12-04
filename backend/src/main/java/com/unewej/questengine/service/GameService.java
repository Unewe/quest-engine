package com.unewej.questengine.service;

import com.unewej.questengine.model.Game;
import com.unewej.questengine.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    GameRepository gameRepository;

    public List<Game> findAll() {
        return gameRepository.findAll();
    }

    public Game save(Game game) {
        return gameRepository.save(game);
    }

    public Optional<Game> findById(Long id) {
        return gameRepository.findById(id);
    }
}
