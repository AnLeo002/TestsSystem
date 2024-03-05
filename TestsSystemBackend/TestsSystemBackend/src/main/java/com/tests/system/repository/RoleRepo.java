package com.tests.system.repository;

import com.tests.system.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface RoleRepo extends JpaRepository<RoleEntity,Long> {
    Set<RoleEntity> findRoleById(Long id);
}
