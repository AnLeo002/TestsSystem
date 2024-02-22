package com.tests.system.tests.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "questions")
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 5000)
    private String content;
    private String img;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String response;
    @Transient//Anotacion para que este atributo no sea guardado en la base de datos
    private String answerUser;
    @ManyToOne(fetch = FetchType.EAGER)
    private Exam exam;

}
//objeto de prueba
/*
    {
    "id": 1,
    "content": "¿Que es POO?",
    "img": "poo.png",
    "option1": "Paradigma de programacion",
    "option2": "Es un conjunto de elementos relacionados",
    "option3": "Es un lenguaje de programacion orientado a objetos",
    "option4": "Son patrones de diseño",
    "response": "Paradigma de programacion",
    "exam": {
        "id": 1
    }
    {
    "content":"¿Que es una clase?",
    "img":"poo.png",
    "option1":"Lo que se ve en el colegio",
    "option2":"Es una representacion digital de algo real",
    "option3":"Es un molde que contiene metodos y propiedades",
    "option4":"Ninguna de las anteriores",
    "response":"Es un molde que contiene metodos y propiedades",
    "exam":{
        "id":1
    }

}
}*/
