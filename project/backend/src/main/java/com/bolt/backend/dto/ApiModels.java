package com.bolt.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public final class ApiModels {

    private ApiModels() {
    }

    public record LoginRequest(String email, String password) {
    }

    public record SignupRequest(
            String email,
            String password,
            String name,
            String username,
            String phone,
            String birthday
    ) {
    }

    public record ChangePasswordRequest(String password) {
    }

    public record AuthResponse(
            String token,
            UserProfile user
    ) {
    }

    public record UserProfile(
            String id,
            String email,
            String name,
            String username,
            String phone,
            String birthday,
            List<VehicleResponse> vehicles
    ) {
    }

    public record VehicleResponse(
            String id,
            String qrCode,
            String vehicleNumber,
            String ownerName,
            String ownerEmail,
            String model,
            String color
    ) {
    }

    public record EmergencyContactRequest(
            String contactName,
            String contactPhone,
            String contactEmail,
            String relationship,
            Integer priority
    ) {
    }

    public record VehicleRegistrationRequest(
            String vehicleNumber,
            String ownerName,
            String ownerEmail,
            List<EmergencyContactRequest> emergencyContacts
    ) {
    }

    public record VehicleRegistrationResponse(
            String id,
            String qrCode
    ) {
    }

    public record ParkingAlertRequest(
            String message,
            String alertType,
            BigDecimal locationLat,
            BigDecimal locationLng
    ) {
    }

    public record IncidentRequest(
            String description,
            String incidentType,
            String photoUrl,
            BigDecimal locationLat,
            BigDecimal locationLng,
            String reporterContact
    ) {
    }

    public record EmergencyActivationRequest(
            BigDecimal locationLat,
            BigDecimal locationLng,
            String activationNote
    ) {
    }
}
