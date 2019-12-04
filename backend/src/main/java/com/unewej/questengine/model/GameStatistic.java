package com.unewej.questengine.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "game_statistic")
public class GameStatistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "game_id", referencedColumnName = "id")
    private Game game;
    @OneToOne(mappedBy = "gameStatistic", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Category category;
    private Float mark;
    private Long countPlayed;
    private Boolean isBlocked;
    private Boolean isPrivate;
}
