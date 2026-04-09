package com.bolt.backend.repository;

import com.bolt.backend.dto.ApiModels;
import jakarta.annotation.PostConstruct;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
public class AppRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void initializeSchema() {
        jdbcTemplate.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto");
        jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS app_users (
                    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                    email text UNIQUE NOT NULL,
                    password_hash text NOT NULL,
                    name text,
                    username text UNIQUE,
                    phone text,
                    birthday text,
                    session_token text UNIQUE,
                    created_at timestamptz DEFAULT now(),
                    updated_at timestamptz DEFAULT now()
                )
                """);
        jdbcTemplate.execute("ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS model text");
        jdbcTemplate.execute("ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS color text");
    }

    public Map<String, Object> findUserByEmail(String email) {
        return findOne("SELECT * FROM app_users WHERE email = ?", email);
    }

    public Map<String, Object> findUserByToken(String token) {
        return findOne("SELECT * FROM app_users WHERE session_token = ?", token);
    }

    public Map<String, Object> createUser(ApiModels.SignupRequest request, String passwordHash, String sessionToken) {
        return jdbcTemplate.queryForMap("""
                INSERT INTO app_users (email, password_hash, name, username, phone, birthday, session_token, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, now())
                RETURNING id, email, name, username, phone, birthday, session_token
                """,
                request.email(),
                passwordHash,
                blankToNull(request.name()),
                blankToNull(request.username()),
                blankToNull(request.phone()),
                blankToNull(request.birthday()),
                sessionToken
        );
    }

    public Map<String, Object> updateSessionToken(String userId, String sessionToken) {
        return jdbcTemplate.queryForMap("""
                UPDATE app_users
                SET session_token = ?, updated_at = now()
                WHERE id = ?
                RETURNING id, email, name, username, phone, birthday, session_token
                """,
                sessionToken,
                UUID.fromString(userId)
        );
    }

    public void clearSessionToken(String userId) {
        jdbcTemplate.update("UPDATE app_users SET session_token = null, updated_at = now() WHERE id = ?", UUID.fromString(userId));
    }

    public void updatePassword(String userId, String passwordHash) {
        jdbcTemplate.update("UPDATE app_users SET password_hash = ?, updated_at = now() WHERE id = ?", passwordHash, UUID.fromString(userId));
    }

    public List<ApiModels.VehicleResponse> findVehiclesByOwnerEmail(String ownerEmail) {
        return jdbcTemplate.query("""
                SELECT id, qr_code, vehicle_number, owner_name, owner_email, model, color
                FROM vehicles
                WHERE owner_email = ?
                ORDER BY created_at DESC
                """, vehicleRowMapper(), ownerEmail);
    }

    public ApiModels.VehicleResponse findVehicleByQrCode(String qrCode) {
        try {
            return jdbcTemplate.queryForObject("""
                    SELECT id, qr_code, vehicle_number, owner_name, owner_email, model, color
                    FROM vehicles
                    WHERE qr_code = ?
                    """, vehicleRowMapper(), qrCode);
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    public Map<String, Object> createVehicle(String qrCode, String vehicleNumber, String ownerName, String ownerEmail) {
        return jdbcTemplate.queryForMap("""
                INSERT INTO vehicles (qr_code, vehicle_number, owner_name, owner_email)
                VALUES (?, ?, ?, ?)
                RETURNING id, qr_code
                """, qrCode, vehicleNumber, ownerName, ownerEmail);
    }

    public void createEmergencyContacts(String vehicleId, List<ApiModels.EmergencyContactRequest> contacts) {
        jdbcTemplate.batchUpdate("""
                INSERT INTO emergency_contacts (vehicle_id, contact_name, contact_phone, contact_email, relationship, priority)
                VALUES (?, ?, ?, ?, ?, ?)
                """, contacts, contacts.size(), (ps, contact) -> {
            ps.setObject(1, UUID.fromString(vehicleId));
            ps.setString(2, contact.contactName());
            ps.setString(3, contact.contactPhone());
            ps.setString(4, blankToNull(contact.contactEmail()));
            ps.setString(5, blankToNull(contact.relationship()));
            ps.setInt(6, contact.priority() == null ? 1 : contact.priority());
        });
    }

    public void createParkingAlert(String vehicleId, ApiModels.ParkingAlertRequest request) {
        jdbcTemplate.update("""
                INSERT INTO parking_alerts (vehicle_id, message, alert_type, location_lat, location_lng)
                VALUES (?, ?, ?, ?, ?)
                """,
                UUID.fromString(vehicleId),
                request.message(),
                blankToNull(request.alertType()),
                request.locationLat(),
                request.locationLng()
        );
    }

    public void createIncident(String vehicleId, ApiModels.IncidentRequest request) {
        jdbcTemplate.update("""
                INSERT INTO incidents (vehicle_id, description, incident_type, photo_url, location_lat, location_lng, reporter_contact)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                UUID.fromString(vehicleId),
                request.description(),
                blankToNull(request.incidentType()),
                blankToNull(request.photoUrl()),
                request.locationLat(),
                request.locationLng(),
                blankToNull(request.reporterContact())
        );
    }

    public void createEmergencyActivation(String vehicleId, ApiModels.EmergencyActivationRequest request) {
        jdbcTemplate.update("""
                INSERT INTO emergency_activations (vehicle_id, location_lat, location_lng, activation_note, contacts_notified)
                VALUES (?, ?, ?, ?, '[]'::jsonb)
                """,
                UUID.fromString(vehicleId),
                request.locationLat(),
                request.locationLng(),
                blankToNull(request.activationNote())
        );
    }

    private Map<String, Object> findOne(String sql, Object value) {
        try {
            return jdbcTemplate.queryForMap(sql, value);
        } catch (EmptyResultDataAccessException ex) {
            return null;
        }
    }

    private RowMapper<ApiModels.VehicleResponse> vehicleRowMapper() {
        return (rs, rowNum) -> new ApiModels.VehicleResponse(
                getString(rs, "id"),
                rs.getString("qr_code"),
                rs.getString("vehicle_number"),
                rs.getString("owner_name"),
                rs.getString("owner_email"),
                rs.getString("model"),
                rs.getString("color")
        );
    }

    private String getString(ResultSet rs, String column) throws SQLException {
        Object value = rs.getObject(column);
        return value == null ? null : value.toString();
    }

    private String blankToNull(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}
