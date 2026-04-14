package com.bolt.backend.service;

import com.bolt.backend.dto.ApiModels;
import com.bolt.backend.repository.AppRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class AppService {

    private final AppRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AppService(AppRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiModels.AuthResponse signup(ApiModels.SignupRequest request) {
        if (request.email() == null || request.email().isBlank() || request.password() == null || request.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }
        if (repository.findUserByEmail(request.email().trim().toLowerCase()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }

        String token = UUID.randomUUID().toString();
        ApiModels.SignupRequest normalizedRequest = new ApiModels.SignupRequest(
                request.email().trim().toLowerCase(),
                request.password(),
                request.name(),
                request.username(),
                request.phone(),
                request.birthday()
        );
        Map<String, Object> user = repository.createUser(normalizedRequest, passwordEncoder.encode(request.password()), token);
        return new ApiModels.AuthResponse(token, toProfile(user));
    }

    public ApiModels.AuthResponse login(ApiModels.LoginRequest request) {
        if (request.email() == null || request.password() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }
        Map<String, Object> user = repository.findUserByEmail(request.email().trim().toLowerCase());
        if (user == null || !user.get("password_hash").toString().equals(request.password())) {
    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
}
        String token = UUID.randomUUID().toString();
        Map<String, Object> updatedUser = repository.updateSessionToken(user.get("id").toString(), token);
        return new ApiModels.AuthResponse(token, toProfile(updatedUser));
    }

    public void logout(String token) {
        Map<String, Object> user = requireUser(token);
        repository.clearSessionToken(user.get("id").toString());
    }

    public void changePassword(String token, ApiModels.ChangePasswordRequest request) {
        if (request.password() == null || request.password().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }
        Map<String, Object> user = requireUser(token);
        repository.updatePassword(user.get("id").toString(), passwordEncoder.encode(request.password()));
    }

    public ApiModels.UserProfile getProfile(String token) {
        return toProfile(requireUser(token));
    }

    public ApiModels.VehicleResponse getVehicleByQrCode(String qrCode) {
        ApiModels.VehicleResponse vehicle = repository.findVehicleByQrCode(qrCode);
        if (vehicle == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle not found");
        }
        return vehicle;
    }

    public ApiModels.VehicleRegistrationResponse registerVehicle(String token, ApiModels.VehicleRegistrationRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
        }

        if (request.vehicleNumber() == null || request.vehicleNumber().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vehicle number is required");
        }

        if (request.ownerName() == null || request.ownerName().isBlank()) {
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Owner name is required");
}

if (request.ownerEmail() == null || request.ownerEmail().isBlank()) {
    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Owner email is required");
}


System.out.println("=== DEBUG START ===");
System.out.println("Vehicle: " + request.vehicleNumber());
System.out.println("Owner: " + request.ownerName());
System.out.println("Email: " + request.ownerEmail());
System.out.println("Contacts: " + request.emergencyContacts());
System.out.println("=== DEBUG END ===");



        List<ApiModels.EmergencyContactRequest> contacts = request.emergencyContacts() == null ? List.of() : request.emergencyContacts().stream()
                .filter(contact -> contact != null
                        && contact.contactName() != null && !contact.contactName().isBlank()
                        && contact.contactPhone() != null && !contact.contactPhone().isBlank())
                .toList();
        if (contacts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "At least one emergency contact is required");
        }

        String qrCode = UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
        String ownerEmail = request.ownerEmail();
        String ownerName = request.ownerName();
        Map<String, Object> vehicle = repository.createVehicle(qrCode, request.vehicleNumber().trim(), ownerName, ownerEmail);
        repository.createEmergencyContacts(vehicle.get("id").toString(), contacts);
        return new ApiModels.VehicleRegistrationResponse(vehicle.get("id").toString(), vehicle.get("qr_code").toString());
    }

    public void createParkingAlert(String vehicleId, ApiModels.ParkingAlertRequest request) {
        if (request.message() == null || request.message().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message is required");
        }
        repository.createParkingAlert(vehicleId, request);
    }

    public void createIncident(String vehicleId, ApiModels.IncidentRequest request) {
        if (request.description() == null || request.description().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Description is required");
        }
        repository.createIncident(vehicleId, request);
    }

    public void createEmergencyActivation(String vehicleId, ApiModels.EmergencyActivationRequest request) {
        if (request.locationLat() == null || request.locationLng() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location is required");
        }
        repository.createEmergencyActivation(vehicleId, request);
    }

    private Map<String, Object> requireUser(String token) {
        if (token == null || token.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing authorization token");
        }
        Map<String, Object> user = repository.findUserByToken(token);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid session");
        }
        return user;
    }

    private ApiModels.UserProfile toProfile(Map<String, Object> user) {
        String email = stringValue(user.get("email"));
        return new ApiModels.UserProfile(
                stringValue(user.get("id")),
                email,
                stringValue(user.get("name")),
                stringValue(user.get("username")),
                stringValue(user.get("phone")),
                stringValue(user.get("birthday")),
                email == null ? List.of() : repository.findVehiclesByOwnerEmail(email)
        );
    }

    private String stringValue(Object value) {
        return value == null ? null : value.toString();
    }

    private String firstNonBlank(String primary, String fallback) {
        if (primary != null && !primary.isBlank()) {
            return primary.trim();
        }
        return fallback;
    }
}
