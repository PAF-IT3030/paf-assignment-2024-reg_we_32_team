package com.foodies.foodiesbackend.service;

import com.foodies.foodiesbackend.entity.Workout;
import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.WorkoutDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface WorkoutService {
    ApiResponse saveWorkout(int id, WorkoutDto workoutDto) throws IOException;

    List<Workout> getUserWorkouts(int id);

    List<Workout> getAllWorkouts();

    ApiResponse deleteWorkout(int workoutID);

    ApiResponse updateWorkout(int workoutId, WorkoutDto workoutDto) throws IOException;

    ApiResponse addLikeUnlike(int workoutId, int userId);

    int getAllLikes(int workoutId);

    int getWorkoutsCount();
}
