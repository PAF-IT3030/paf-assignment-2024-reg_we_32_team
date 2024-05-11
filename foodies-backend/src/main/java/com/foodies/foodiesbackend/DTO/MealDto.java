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

public class MealDto {
    private String mealName;       // Name of the workout
    private String mealDescription; // Description of the workout
    private MultipartFile image;      // Image file of the workout
    private int likes;
}
