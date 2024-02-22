package com.tests.system.tests.repository;

import com.tests.system.tests.entities.Category;
import com.tests.system.tests.entities.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepo extends JpaRepository<Exam,Long> {
    @Query("SELECT e FROM Exam e WHERE e.category.id = ?1")
    List<Exam> findByCategory(Long id);

    List<Exam> findByEnable(boolean enable);
    List<Exam> findByCategoryAndEnable(Category category,boolean enable);

}
