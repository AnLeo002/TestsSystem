package com.tests.system.tests.service.impl;

import com.tests.system.tests.entities.Question;
import com.tests.system.tests.repository.QuestionRepo;
import com.tests.system.tests.service.QuestionService;
import com.tests.system.tests.service.dto.QuestionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionRepo repo;
    @Override
    public Question createQuestion(QuestionDTO questionDTO) {
       Question question = Question.builder()
               .content(questionDTO.getContent())
               .exam(questionDTO.getExam())
               .option1(questionDTO.getOption1())
               .option2(questionDTO.getOption2())
               .option3(questionDTO.getOption3())
               .option4(questionDTO.getOption4())
               .response(questionDTO.getResponse())
               .img(questionDTO.getImg())
               .build();
        return repo.save(question);
    }

    @Override
    public Question findQuestionById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Override
    public List<Question> findAllQuestions() {
        return repo.findAll();
    }



    @Override
    public List<Question> findAllQuestionsByExam(Long id){
        return repo.findByExam(id);
    }

    @Override
    public List<Question> findAllUnansweredQuestions(Long id) {
        List<Question> questionList = repo.findByExam(id).stream()
                .map(q -> new Question(q.getId(),q.getContent(), q.getImg(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4(),q.getResponse(),q.getAnswerUser(),q.getExam()))
                .collect(Collectors.toList());

        return questionList;
    }

    @Override
    public void deleteQuestion(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Question updateQuestion(QuestionDTO questionDTO, Long id) {
        Question question = repo.findById(id).orElseThrow();

        question.setContent(questionDTO.getContent());
        question.setExam(questionDTO.getExam());
        question.setOption1(questionDTO.getOption1());
        question.setOption2(questionDTO.getOption2());
        question.setOption3(questionDTO.getOption3());
        question.setOption4(questionDTO.getOption4());
        question.setResponse(questionDTO.getResponse());
        question.setImg(questionDTO.getImg());

        return repo.save(question);
    }
}
