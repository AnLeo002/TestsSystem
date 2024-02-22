package com.tests.system.tests.service.impl;

import com.tests.system.tests.entities.Exam;
import com.tests.system.tests.repository.ExamRepo;
import com.tests.system.tests.service.ExamService;
import com.tests.system.tests.service.dto.ExamDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements ExamService {
    @Autowired
    private ExamRepo repo;
    @Override
    public Exam createExam(ExamDTO exam) {
        Exam examSave = Exam.builder()
                .category(exam.getCategory())
                .description(exam.getDescription())
                .title(exam.getTitle())
                .points(exam.getPoints())
                .enable(exam.isEnable())
                .numberOfQuestions(exam.getNumberOfQuestions())
                .questions(exam.getQuestions())
                .build();
        return repo.save(examSave);
    }

    @Override
    public Exam updateExam(ExamDTO exam,Long id) {

        Exam examSave = repo.findById(id).orElseThrow();

        examSave.setCategory(exam.getCategory());
        examSave.setDescription(exam.getDescription());
        examSave.setTitle(exam.getTitle());
        examSave.setPoints(exam.getPoints());
        examSave.setEnable(exam.isEnable());
        examSave.setNumberOfQuestions(exam.getNumberOfQuestions());
        examSave.setQuestions(exam.getQuestions());

        return repo.save(examSave);
    }

    @Override
    public List<Exam> findAllExams() {
        return repo.findAll();
    }

    @Override
    public List<Exam> findAllExamsByCategory(Long categoryId) {
        List<Exam> listExam = repo.findByCategory(categoryId).stream()
                .filter(exam -> exam.isEnable())
                .collect(Collectors.toList());

        return listExam;
    }

    @Override
    public List<Exam> findAllExamsIfEnabled() {
        List<Exam> listExam = repo.findAll().stream()
                .filter(exam -> exam.isEnable())
                .collect(Collectors.toList());

        return listExam;
    }

    @Override
    public void deleteExamById(Long examId) {
        repo.deleteById(examId);

    }

    @Override
    public Exam findExamById(Long id) {
        return repo.findById(id).orElseThrow();
    }
}
