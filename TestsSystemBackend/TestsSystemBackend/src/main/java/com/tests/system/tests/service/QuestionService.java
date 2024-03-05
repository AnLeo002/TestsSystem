package com.tests.system.tests.service;

import com.tests.system.tests.entities.Question;
import com.tests.system.tests.service.dto.QuestionDTO;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface QuestionService {
    Question createQuestion(QuestionDTO questionDTO);
    Question findQuestionById(Long id);
    List<Question> findAllQuestions();
    List<Question> findAllQuestionsByExam(Long id);
    Map<String,Object> evaluateAnswer(List<Question> questions);
    void deleteQuestion(Long id);
    Question updateQuestion(QuestionDTO questionDTO, Long id);
}
