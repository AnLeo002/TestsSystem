package com.tests.system.repository;

import com.tests.system.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<UserEntity,Long> {
    public Optional<UserEntity> findByUsername(String username);
}
