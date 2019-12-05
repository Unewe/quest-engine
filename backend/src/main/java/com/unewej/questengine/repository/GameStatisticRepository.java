package com.unewej.questengine.repository;

import com.unewej.questengine.model.GameStatisticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameStatisticRepository extends JpaRepository<GameStatisticEntity, Long> {
}
