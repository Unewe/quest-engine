package com.unewej.questengine.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String name;
    private String description;
    @OneToMany(mappedBy="game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions;
    private Date date;
    @OneToOne(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private GameStatistic gameStatistic;
}
