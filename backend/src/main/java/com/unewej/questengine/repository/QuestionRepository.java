package com.unewej.questengine.repository;

import com.unewej.questengine.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    void deleteAllByGame_Id(Long id);
    Optional<Question> findByGame_IdAndPosition(Long gameId, Integer position);
}
