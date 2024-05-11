package com.foodies.foodiesbackend.service.impl;

import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.MealDto;
import com.foodies.foodiesbackend.entity.User;
import com.foodies.foodiesbackend.entity.Meal;
import com.foodies.foodiesbackend.repository.UserRepository;
import com.foodies.foodiesbackend.repository.MealRepository;
import com.foodies.foodiesbackend.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class MealServiceImpl implements MealService {
    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse saveMeal(int id, MealDto mealDto) throws IOException {
        Meal meal1 = new Meal();

        //post1.findPostByUpk(id);
        User user = userRepository.findUserById(id);
        meal1.setUser(user);
        meal1.setMealName(mealDto.getMealName());
        meal1.setMealDescription(mealDto.getMealDescription());
        byte[] imageContent = mealDto.getImage().getBytes();
        meal1.setImage(imageContent);

        mealRepository.save(meal1);
        return new ApiResponse(200, "workout added successfully", false);
    }

    @Override
    public List<Meal> getUserMeals(int uid) {
        return mealRepository.findAllByUser_Id(uid);
    }

    @Override
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    @Override
    public ApiResponse deleteMeal(int mealId) {
        Meal meal = mealRepository.findMealById(mealId);
        mealRepository.delete(meal);
        return new ApiResponse(200, "workout deleted successfully", false);
    }

    @Override
    public ApiResponse updateMeal(int mealId, MealDto mealDto) throws IOException {
        Meal meal = mealRepository.findById(mealId);
        if(meal == null){
            return new ApiResponse(404, "Post does not exist", false);
        }else {
            Meal updateMeal = meal;
            updateMeal.setMealName(mealDto.getMealName());
            updateMeal.setMealDescription(mealDto.getMealDescription());
            byte[] imageContent = mealDto.getImage().getBytes();
            updateMeal.setImage(imageContent);
            mealRepository.save(meal);
            return new ApiResponse(200, "workout updated successfully", false);
        }
    }

    @Override
    public ApiResponse addLikeUnlike(int mealId, int userId){
        int liked = mealRepository.findByMealIdAndUserId(mealId, userId);
        if(liked == 0){
            mealRepository.addLike(mealId, userId);
            return new ApiResponse(200, "Workout liked successfully", false);
        }else {
            mealRepository.deleteByMealIdAndUserId(mealId, userId);
            return new ApiResponse(200, "Workout unliked successfully", false);
        }
    }

    @Override
    public int getAllLikes(int mealId){
        return mealRepository.getAllLikes(mealId);
    }

    @Override
    public int getMealsCount() {
        return (int) mealRepository.count();
    }
}
