package com.unewej.questengine.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", referencedColumnName = "id")
    private Game game;
    private Integer position;
    private String text;
    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answers;
    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Hint> hints;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return Objects.equals(id, question.id) &&
                Objects.equals(position, question.position) &&
                Objects.equals(text, question.text) &&
                Objects.equals(answers, question.answers) &&
                Objects.equals(hints, question.hints);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, position, text, answers, hints);
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", position=" + position +
                ", text='" + text + '\'' +
                ", answers=" + answers +
                ", hints=" + hints +
                '}';
    }
}
