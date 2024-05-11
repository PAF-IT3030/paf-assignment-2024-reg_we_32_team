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
public class WorkoutFeedDto {

    private int id;                      // ID of the workout
    private String workoutName;          // Name of the workout
    private String workoutDescription;   // Description of the workout
    private byte[] image;                // Image byte array of the workout
    private int user_workout_pk;         // ID of the user who posted the workout

}
