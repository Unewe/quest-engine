package com.unewej.questengine.service;

import com.unewej.questengine.model.Question;
import com.unewej.questengine.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public void deleteByGameId(Long id) {
        questionRepository.deleteAllByGame_Id(id);
    }

    public void deleteAll(Iterable<? extends Question> questions) {
        questionRepository.deleteAll(questions);
    }
}
