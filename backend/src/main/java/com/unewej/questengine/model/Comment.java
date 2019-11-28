package com.unewej.questengine.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
//@Entity
//@Table(name = "comment")
public class Comment {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long gameId;
    private String text;
    private Date date;
}
