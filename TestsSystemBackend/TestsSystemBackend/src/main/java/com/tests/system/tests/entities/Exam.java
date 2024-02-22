package com.tests.system.tests.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Exams")
@Builder
public class Exam{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String points;
    @Column(name = "number_of_questions")
    private String numberOfQuestions;
    private boolean enable = false;
    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;
    @OneToMany(mappedBy = "exam",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Question> questions;
}
    //objeto de prueba
    /*
    {
    "title":"Test de java SE",
    "description":"Con esta prueba vas a poner en practica tus conocimientos sobre Java Core y POO",
    "points":"20",
    "numberOfQuestions":"10",
    "category":{
        "id":1
    }
}*/

