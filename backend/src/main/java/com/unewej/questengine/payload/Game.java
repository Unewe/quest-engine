package com.unewej.questengine.payload;

import com.unewej.questengine.model.GameStatisticEntity;
import com.unewej.questengine.model.QuestionEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class Game {
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Date date;
    private List<QuestionEntity> questions;
    private GameStatisticEntity gameStatistic;
}
