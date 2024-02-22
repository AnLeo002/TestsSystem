package com.tests.system.tests.controller;

import com.tests.system.tests.entities.Exam;
import com.tests.system.tests.entities.Question;
import com.tests.system.tests.service.QuestionService;
import com.tests.system.tests.service.dto.QuestionDTO;
import com.tests.system.tests.service.impl.ExamServiceImpl;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private ExamServiceImpl examService;
    @PostMapping("/create")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDTO questionDTO) throws URISyntaxException {
        return ResponseEntity.created(new URI("/question/create")).body(questionService.createQuestion(questionDTO));
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Question> findQuestionById(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(questionService.findQuestionById(id));
    }
    @GetMapping("/findAll")
    public ResponseEntity<?>findAll(){
        return ResponseEntity.ok().body(questionService.findAllQuestions());
    }
    @GetMapping("/findAllByExam/{id}")
    public ResponseEntity<?> findAllQuestionsByExam(@PathVariable("id")Long id){
        return ResponseEntity.ok().body(questionService.findAllQuestionsByExam(id));
    }
    @GetMapping("/findAllUnanswered/{id}")
    public ResponseEntity<List<Question>> findAllUnansweredQuestions(@PathVariable Long id){
        return ResponseEntity.ok(questionService.findAllUnansweredQuestions(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Question> updateQuestion(@RequestBody QuestionDTO questionDTO, @PathVariable("id") Long id){
        return ResponseEntity.ok().body(questionService.updateQuestion(questionDTO,id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }
}
