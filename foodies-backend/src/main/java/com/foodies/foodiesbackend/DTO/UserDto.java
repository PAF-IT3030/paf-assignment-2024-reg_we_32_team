package com.foodies.foodiesbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok annotations for constructors, getters, and setters
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDto {

    private int id;              // ID of the user
    private String firstName;    // First name of the user
    private String lastName;     // Last name of the user
    private int age;             // Age of the user
    private String gender;       // Gender of the user
    private String email;        // Email of the user
    private String username;     // Username of the user
    private String password;     // Password of the user
    private String role;         // Role of the user (e.g., admin, user)

    // Overridden toString method for easy debugging and logging
    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
