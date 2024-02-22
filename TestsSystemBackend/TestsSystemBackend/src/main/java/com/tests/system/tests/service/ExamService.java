package com.tests.system.tests.service;

import com.tests.system.tests.entities.Exam;
import com.tests.system.tests.service.dto.ExamDTO;

import java.util.List;
import java.util.Set;

public interface ExamService {
    Exam createExam(ExamDTO exam);
    Exam updateExam(ExamDTO exam,Long id);
    List<Exam> findAllExams();
    List<Exam> findAllExamsByCategory(Long categoryId );
    List<Exam> findAllExamsIfEnabled();
    void deleteExamById(Long examId);
    Exam findExamById(Long id);

}
