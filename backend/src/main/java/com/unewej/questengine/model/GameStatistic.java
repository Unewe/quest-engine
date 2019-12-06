package com.unewej.questengine.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@Table(name = "game_statistic")
public class GameStatistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @OneToOne(mappedBy = "gameStatistic", fetch = FetchType.LAZY)
    private Game game;
    private Float mark = 0.0F;
    private Long countPlayed = 0L;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameStatistic that = (GameStatistic) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(mark, that.mark) &&
                Objects.equals(countPlayed, that.countPlayed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, mark, countPlayed);
    }

    @Override
    public String toString() {
        return "GameStatistic{" +
                "id=" + id +
                ", mark=" + mark +
                ", countPlayed=" + countPlayed +
                '}';
    }
}
