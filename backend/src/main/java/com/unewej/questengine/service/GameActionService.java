package com.unewej.questengine.service;

import com.unewej.questengine.repository.GameActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameActionService {
    @Autowired
    GameActionRepository gameActionRepository;
}
