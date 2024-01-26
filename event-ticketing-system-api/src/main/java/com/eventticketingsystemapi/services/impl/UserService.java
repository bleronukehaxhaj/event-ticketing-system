package com.eventticketingsystemapi.services.impl;

import com.eventticketingsystemapi.dtos.LoginRequest;
import com.eventticketingsystemapi.dtos.LogoutRequest;
import com.eventticketingsystemapi.dtos.RegistrationRequest;
import com.eventticketingsystemapi.exceptions.UserException;
import com.eventticketingsystemapi.models.User;
import com.eventticketingsystemapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegistrationRequest registrationRequest) {
        if (userRepository.existsByEmail(registrationRequest.getEmail())) {
            throw new UserException("Email already exists");
        }

        User newUser = new User();
        newUser.setUsername(registrationRequest.getUsername());
        newUser.setPassword(registrationRequest.getPassword());
        newUser.setEmail(registrationRequest.getEmail());
        newUser.setAuthToken(generateToken());
        newUser.setLoggedIn(true);

        User user = userRepository.save(newUser);


        return user.getAuthToken();
    }


    public String login(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmailAndPassword(
                loginRequest.getEmail(), loginRequest.getPassword());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setAuthToken(generateToken());
            user.setLoggedIn(true);
            userRepository.save(user);
            return user.getAuthToken();
        } else {
            throw new UserException("Invalid email or password");
        }

    }

    public void logout(LogoutRequest logoutRequest) {
        Optional<User> userOptional = userRepository.findByAuthToken(logoutRequest.getAuthToken());
        userOptional.ifPresent(user -> {
            user.setAuthToken(null);
            user.setLoggedIn(false);
            userRepository.save(user);
        });
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}
