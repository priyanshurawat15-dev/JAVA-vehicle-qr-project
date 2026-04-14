package com.bolt.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.bolt.backend") // ✅ yaha hona chahiye
public class BoltBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoltBackendApplication.class, args);
    }
}