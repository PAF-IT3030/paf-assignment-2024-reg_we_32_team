package com.foodies.foodiesbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok annotations for constructors, getters, and setters
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class MealFeedDto {

    private int id;                      // ID of the workout
    private String mealName;          // Name of the workout
    private String mealDescription;   // Description of the workout
    private byte[] image;                // Image byte array of the workout
    private int user_workout_pk;
}
