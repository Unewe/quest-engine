package com.unewej.questengine.model;

import lombok.Data;

import javax.persistence.*;

@Data
//@Entity
//@Table(name = "game_statistic")
public class GameStatistic {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long gameId;
    private Float mark;
    private Long countPlayed;
    private Boolean isBlocked;
    private Boolean isPrivate;
}
