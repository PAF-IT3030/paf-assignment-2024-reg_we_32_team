package com.foodies.foodiesbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

// Lombok annotations for constructors, getters, and setters
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StatusDto {
    private String statusName;       // Name of the workout
    private String statusDescription; // Description of the workout
    private MultipartFile image;      // Image file of the workout
    private int likes;                // Number of likes for the workout
}
