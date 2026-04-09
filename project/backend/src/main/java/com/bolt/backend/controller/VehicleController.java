package com.bolt.backend.controller;

import com.bolt.backend.dto.ApiModels;
import com.bolt.backend.service.AppService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class VehicleController {

    private final AppService appService;

    public VehicleController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/vehicle/{qrId}")
    public ApiModels.VehicleResponse getVehicle(@PathVariable String qrId) {
        return appService.getVehicleByQrCode(qrId);
    }

    @PostMapping("/vehicle/register")
    public ApiModels.VehicleRegistrationResponse registerVehicle(
            HttpServletRequest request,
            @RequestBody ApiModels.VehicleRegistrationRequest body
    ) {
        return appService.registerVehicle(extractToken(request), body);
    }

    @PostMapping("/vehicle/{vehicleId}/parking-alert")
    public Map<String, String> parkingAlert(
            @PathVariable String vehicleId,
            @RequestBody ApiModels.ParkingAlertRequest body
    ) {
        appService.createParkingAlert(vehicleId, body);
        return Map.of("message", "Alert sent successfully");
    }

    @PostMapping("/vehicle/{vehicleId}/incident")
    public Map<String, String> incident(
            @PathVariable String vehicleId,
            @RequestBody ApiModels.IncidentRequest body
    ) {
        appService.createIncident(vehicleId, body);
        return Map.of("message", "Incident reported successfully");
    }

    @PostMapping("/vehicle/{vehicleId}/emergency")
    public Map<String, String> emergency(
            @PathVariable String vehicleId,
            @RequestBody ApiModels.EmergencyActivationRequest body
    ) {
        appService.createEmergencyActivation(vehicleId, body);
        return Map.of("message", "Emergency activated successfully");
    }

    private String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }
        return null;
    }
}
