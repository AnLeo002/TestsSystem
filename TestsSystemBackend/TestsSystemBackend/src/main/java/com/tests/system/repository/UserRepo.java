package com.tests.system.repository;

import com.tests.system.entities.RoleEntity;
import com.tests.system.entities.UserEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.management.relation.Role;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepo extends CrudRepository<UserEntity,Long> {
     Optional<UserEntity> findByUsername(String username);

    //@Query("SELECT ur FROM User u JOIN u.roles ur WHERE ur.id = ?1")
    //Optional<RoleEntity> findRoleByRoleId(Long roleId);
}

