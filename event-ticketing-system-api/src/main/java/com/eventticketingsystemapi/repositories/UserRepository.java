package com.eventticketingsystemapi.repositories;

import com.eventticketingsystemapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByAuthToken(String authToken);

    boolean existsByEmail(String email);
}

