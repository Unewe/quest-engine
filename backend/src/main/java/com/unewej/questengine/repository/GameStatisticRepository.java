package com.unewej.questengine.repository;

import com.unewej.questengine.model.GameStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameStatisticRepository extends JpaRepository<GameStatistic, Long> {
}
