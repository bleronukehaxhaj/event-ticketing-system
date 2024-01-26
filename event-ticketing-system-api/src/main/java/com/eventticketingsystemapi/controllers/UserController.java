package com.eventticketingsystemapi.controllers;

import com.eventticketingsystemapi.dtos.LoginRequest;
import com.eventticketingsystemapi.dtos.LogoutRequest;
import com.eventticketingsystemapi.dtos.RegistrationRequest;
import com.eventticketingsystemapi.exceptions.UserException;
import com.eventticketingsystemapi.models.User;
import com.eventticketingsystemapi.services.impl.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        try {
            String authToken = userService.register(registrationRequest);
            return ResponseEntity.ok(authToken);
        } catch (UserException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        String authToken = userService.login(loginRequest);
        if (authToken != null) {
            return ResponseEntity.ok(authToken);
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestBody LogoutRequest logoutRequest) {
        try {
            userService.logout(logoutRequest);
            return ResponseEntity.ok("Logout successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Logout failed. Reason: " + e.getMessage());
        }
    }
}
