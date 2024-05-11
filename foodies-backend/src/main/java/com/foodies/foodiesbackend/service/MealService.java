package com.foodies.foodiesbackend.service;

import com.foodies.foodiesbackend.entity.Meal;
import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.MealDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface MealService {
    ApiResponse saveMeal(int id, MealDto mealDto) throws IOException;

    List<Meal> getUserMeals(int id);

    List<Meal> getAllMeals();

    ApiResponse deleteMeal(int mealID);

    ApiResponse updateMeal(int mealId, MealDto mealDto) throws IOException;

    ApiResponse addLikeUnlike(int mealId, int userId);

    int getAllLikes(int mealId);

    int getMealsCount();
}
