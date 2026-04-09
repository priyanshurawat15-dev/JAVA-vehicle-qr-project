package com.bolt.backend.controller;

import com.bolt.backend.dto.ApiModels;
import com.bolt.backend.service.AppService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AppService appService;

    public UserController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/profile")
    public ApiModels.UserProfile profile(HttpServletRequest request) {
        return appService.getProfile(extractToken(request));
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
