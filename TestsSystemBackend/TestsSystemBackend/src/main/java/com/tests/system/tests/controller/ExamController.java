package com.tests.system.tests.controller;

import com.tests.system.tests.entities.Exam;
import com.tests.system.tests.service.dto.ExamDTO;
import com.tests.system.tests.service.impl.ExamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/exam")
@CrossOrigin("*")
public class ExamController {
    @Autowired
    private ExamServiceImpl examService;
    @PostMapping("/create")
    public ResponseEntity<Exam> createExam(@RequestBody ExamDTO examDTO) throws URISyntaxException {
        return ResponseEntity.created(new URI("/exam/create")).body(examService.createExam(examDTO));
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Exam> findExamById(@PathVariable Long id){
        return ResponseEntity.ok().body(examService.findExamById(id));
    }
    @GetMapping("/findAll")
    public ResponseEntity findAllExams(){
        return ResponseEntity.ok().body(examService.findAllExams());
    }
    @GetMapping("findByCategory/{id}")
    public ResponseEntity<List<Exam>> findAllExamsByCategory(@PathVariable Long id){
        return ResponseEntity.ok(examService.findAllExamsByCategory(id));
    }
    @GetMapping("/findAllEnabled")
    public ResponseEntity<List<Exam>> findAllExamsIfEnable(){
        return ResponseEntity.ok(examService.findAllExamsIfEnabled());
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Exam> updateExam(@RequestBody ExamDTO examDTO, @PathVariable Long id){
        return ResponseEntity.ok().body(examService.updateExam(examDTO,id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id){
        examService.deleteExamById(id);
        return ResponseEntity.ok().build();
    }
}
