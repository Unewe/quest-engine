package com.unewej.questengine.model;

import lombok.Data;

import javax.persistence.*;

@Data
//@Entity
//@Table(name = "answer")
public class Answer {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long questionId;
    private String text;
}
