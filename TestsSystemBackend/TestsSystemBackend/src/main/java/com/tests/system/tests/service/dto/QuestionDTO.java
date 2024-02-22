package com.tests.system.tests.service.dto;

import com.tests.system.tests.entities.Exam;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private String content;
    private String img;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String response;
    @ManyToOne(fetch = FetchType.EAGER)
    private Exam exam;
}
