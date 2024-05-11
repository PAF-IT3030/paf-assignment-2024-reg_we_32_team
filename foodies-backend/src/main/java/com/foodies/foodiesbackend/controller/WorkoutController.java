package com.foodies.foodiesbackend.controller;

import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.WorkoutDto;
import com.foodies.foodiesbackend.entity.Workout;
import com.foodies.foodiesbackend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class WorkoutController {

    private final WorkoutService workoutService;

    // Constructor injection of WorkoutService
    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    // POST endpoint to save a new workout
    @PostMapping("/workouts/{id}")
    public ApiResponse saveWorkout(@PathVariable int id, @ModelAttribute WorkoutDto workoutDto) throws IOException {
        return workoutService.saveWorkout(id, workoutDto);
    }

    // GET endpoint to retrieve workouts of a user
    @GetMapping("/workouts/{id}")
    public List<Workout> getUserWorkouts(@PathVariable int id) {
        return workoutService.getUserWorkouts(id);
    }

    // GET endpoint to retrieve all workouts
    @GetMapping("/workouts")
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    // DELETE endpoint to delete a workout
    @DeleteMapping("/workouts/{workoutId}")
    public ApiResponse deleteWorkout(@PathVariable int workoutId) {
        return workoutService.deleteWorkout(workoutId);
    }

    // PATCH endpoint to update a workout
    @PatchMapping(value = "/workout/{workoutId}")
    public ApiResponse updateWorkout(@PathVariable int workoutId, @ModelAttribute WorkoutDto workoutDto) throws IOException {
        return workoutService.updateWorkout(workoutId, workoutDto);
    }

    // POST endpoint to add or remove like on a workout
    @PostMapping("/workouts/{workoutId}/like-unlike/{userId}")
    public ApiResponse addLikeUnlike(@PathVariable int workoutId, @PathVariable int userId) {
        return workoutService.addLikeUnlike(workoutId, userId);
    }

    // GET endpoint to get total likes on a workout
    @GetMapping("/workouts/{workoutId}/likes")
    public int getAllLikes(@PathVariable int workoutId) {
        return workoutService.getAllLikes(workoutId);
    }

    // GET endpoint to get total count of workouts
    @GetMapping("/workouts/count")
    public int getWorkoutsCount() {
        return workoutService.getWorkoutsCount();
    }
}
