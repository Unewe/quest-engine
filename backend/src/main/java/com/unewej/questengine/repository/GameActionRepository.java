package com.unewej.questengine.repository;

import com.unewej.questengine.model.GameAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameActionRepository extends JpaRepository<GameAction, Long> {
}
