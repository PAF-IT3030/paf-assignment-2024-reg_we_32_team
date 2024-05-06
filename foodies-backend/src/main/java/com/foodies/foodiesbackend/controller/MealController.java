package com.foodies.foodiesbackend.controller;

import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.MealDto;
import com.foodies.foodiesbackend.entity.Meal;
import com.foodies.foodiesbackend.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")

public class MealController {
    private final MealService mealService;

    // Constructor injection of WorkoutService
    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    // POST endpoint to save a new workout
    @PostMapping("/meals/{id}")
    public ApiResponse saveMeal(@PathVariable int id, @ModelAttribute MealDto mealDto) throws IOException {
        return mealService.saveMeal(id, mealDto);
    }

    // GET endpoint to retrieve workouts of a user
    @GetMapping("/meals/{id}")
    public List<Meal> getUserMeals(@PathVariable int id) {
        return mealService.getUserMeals(id);
    }

    // GET endpoint to retrieve all workouts
    @GetMapping("/meals")
    public List<Meal> getAllMeals() {
        return mealService.getAllMeals();
    }

    // DELETE endpoint to delete a workout
    @DeleteMapping("/meals/{mealId}")
    public ApiResponse deleteMeal(@PathVariable int mealId) {
        return mealService.deleteMeal(mealId);
    }

    // PATCH endpoint to update a workout
    @PatchMapping(value = "/meal/{mealId}")
    public ApiResponse updateMeal(@PathVariable int mealId, @ModelAttribute MealDto mealDto) throws IOException {
        return mealService.updateMeal(mealId, mealDto);
    }

    // POST endpoint to add or remove like on a workout
    @PostMapping("/meals/{mealId}/likes/{userId}")
    public ApiResponse addLikeUnlike(@PathVariable int mealId, @PathVariable int userId) {
        return mealService.addLikeUnlike(mealId, userId);
    }

    // GET endpoint to get total likes on a workout
    @GetMapping("/meals/{mealId}/likes")
    public int getAllLikes(@PathVariable int mealId) {
        return mealService.getAllLikes(mealId);
    }

    // GET endpoint to get total count of workouts
    @GetMapping("/meals/count")
    public int getMealsCount() {
        return mealService.getMealsCount();
    }
}
