package com.unewej.questengine.repository;

import com.unewej.questengine.model.Hint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HintRepository extends JpaRepository<Hint, Long> {
}
