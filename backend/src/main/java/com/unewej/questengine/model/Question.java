package com.unewej.questengine.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
//@Entity
//@Table(name = "question")
public class Question {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long gameId;
    private Integer position;
    private String text;
    private List<Answer> answers;
    private List<Hint> hints;
}
