package com.tests.system.tests.service.dto;

import com.tests.system.tests.entities.Category;
import com.tests.system.tests.entities.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private String title;
    private String description;
    private String points;
    private String numberOfQuestions;
    private boolean enable = false;
    private Category category;
    private Set<Question> questions;
}
