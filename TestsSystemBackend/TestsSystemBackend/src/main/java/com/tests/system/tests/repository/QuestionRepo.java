package com.tests.system.tests.repository;

import com.tests.system.tests.entities.Exam;
import com.tests.system.tests.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Long> {
    @Query("SELECT q FROM Question q WHERE q.exam.id = ?1")
    List<Question> findByExam(Long id);

}
