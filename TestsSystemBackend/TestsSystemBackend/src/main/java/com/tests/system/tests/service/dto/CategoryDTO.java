package com.tests.system.tests.service.dto;

import com.tests.system.tests.entities.Exam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private String title;
    private String description;
    private Set<Exam> exams;
}
