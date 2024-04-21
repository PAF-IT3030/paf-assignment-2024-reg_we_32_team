package com.socialmedia.workoutplan.controller;

import com.socialmedia.workoutplan.model.WorkoutPlan;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workoutplan")
public class WorkoutPlanAPIService {
    WorkoutPlan workoutPlan;
    @GetMapping("{id}")
    public WorkoutPlan getWorkoutPlanDetails(String Id) {
        return workoutPlan;
    }

    @PostMapping
    public String createWorkoutPlanDetails(@RequestBody WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
        return "Workout plan created successfully";
    }

    @PutMapping
    public String updateWorkoutPlanDetails(@RequestBody WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
        return "Workout plan updated successfully";
    }

    @DeleteMapping("{Id}")
    public String deleteWorkoutPlanDetails(String Id) {
        this.workoutPlan = null;
        return "Workout plan deleted successfully";
    }
}
