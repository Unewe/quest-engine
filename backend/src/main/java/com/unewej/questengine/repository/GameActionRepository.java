package com.unewej.questengine.repository;

import com.unewej.questengine.model.GameAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameActionRepository extends JpaRepository<GameAction, Long> {
    public Optional<GameAction> findByUserIdAndGameId(Long userId, Long gameId);
    public Optional<GameAction> findByUserIdAndGameIdAndTerminated(Long userId, Long gameId, Boolean terminated);
}
