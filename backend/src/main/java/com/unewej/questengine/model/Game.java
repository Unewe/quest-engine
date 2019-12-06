package com.unewej.questengine.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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
    private Date date = new Date();
    private String category = "Default";
    private Boolean isBlocked = false;
    private Boolean isPrivate = false;
    private Boolean isOpen = false;
    private Boolean isHidden = true;
    private Date startTime;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "game_statistic_id", referencedColumnName = "id")
    private GameStatistic gameStatistic;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Game game = (Game) o;
        return Objects.equals(id, game.id) &&
                Objects.equals(userId, game.userId) &&
                Objects.equals(name, game.name) &&
                Objects.equals(description, game.description) &&
                Objects.equals(questions, game.questions) &&
                Objects.equals(date, game.date) &&
                Objects.equals(category, game.category) &&
                Objects.equals(isBlocked, game.isBlocked) &&
                Objects.equals(isPrivate, game.isPrivate) &&
                Objects.equals(isOpen, game.isOpen) &&
                Objects.equals(isHidden, game.isHidden) &&
                Objects.equals(startTime, game.startTime) &&
                Objects.equals(gameStatistic, game.gameStatistic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, name, description, questions, date, category, isBlocked, isPrivate, isOpen, isHidden, startTime, gameStatistic);
    }

    @Override
    public String toString() {
        return "Game{" +
                "id=" + id +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", questions=" + questions +
                ", date=" + date +
                ", category='" + category + '\'' +
                ", isBlocked=" + isBlocked +
                ", isPrivate=" + isPrivate +
                ", isOpen=" + isOpen +
                ", isHidden=" + isHidden +
                ", startTime=" + startTime +
                ", gameStatistic=" + gameStatistic +
                '}';
    }
}
