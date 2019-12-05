package com.unewej.questengine.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "game_statistic")
public class GameStatisticEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @OneToOne(mappedBy = "gameStatistic", fetch = FetchType.LAZY)
    private GameEntity game;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private CategoryEntity category;
    private Float mark;
    private Long countPlayed;
    private Boolean isBlocked;
    private Boolean isPrivate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameStatisticEntity that = (GameStatisticEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(category, that.category) &&
                Objects.equals(mark, that.mark) &&
                Objects.equals(countPlayed, that.countPlayed) &&
                Objects.equals(isBlocked, that.isBlocked) &&
                Objects.equals(isPrivate, that.isPrivate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, category, mark, countPlayed, isBlocked, isPrivate);
    }

    @Override
    public String toString() {
        return "GameStatisticEntity{" +
                "id=" + id +
                ", category=" + category +
                ", mark=" + mark +
                ", countPlayed=" + countPlayed +
                ", isBlocked=" + isBlocked +
                ", isPrivate=" + isPrivate +
                '}';
    }
}
