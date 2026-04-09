package com.bolt.backend.controller;

import com.bolt.backend.dto.ApiModels;
import com.bolt.backend.service.AppService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AppService appService;

    public AuthController(AppService appService) {
        this.appService = appService;
    }

    @PostMapping("/login")
    public ApiModels.AuthResponse login(@RequestBody ApiModels.LoginRequest request) {
        return appService.login(request);
    }

    @PostMapping("/signup")
    public ApiModels.AuthResponse signup(@RequestBody ApiModels.SignupRequest request) {
        return appService.signup(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        appService.logout(extractToken(request));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/change-password")
    public Map<String, String> changePassword(
            HttpServletRequest request,
            @RequestBody ApiModels.ChangePasswordRequest changePasswordRequest
    ) {
        appService.changePassword(extractToken(request), changePasswordRequest);
        return Map.of("message", "Password updated successfully");
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
