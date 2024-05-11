

package com.foodies.foodiesbackend.repository;

import com.foodies.foodiesbackend.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository

public interface MealRepository extends JpaRepository<Meal, Integer>{
    //    @Query(value = "SELECT w.id, w.image, w.workout_workoutName, w.post_workoutDescription, count(l.workout_idadd) from workout w inner join likes l on l.workout_id = w.id where w.uid = :uid", nativeQuery = true)
    List<Meal> findAllByUser_Id(int uid);

    Meal findMealById(int id);

    void deleteByIdAndUserId(int id, int postId);

    Meal findById(int mealId);

    @Query(value = "select count(id) from likes where meal_id = :mealId and user_id = :userId", nativeQuery = true)
    int findByMealIdAndUserId(int mealId, int userId);

    @Modifying
    @Transactional
    @Query(value = "insert into likes (meaal_id, user_id) values (:mealId, :userId)", nativeQuery = true)
    void addLike(int mealId, int userId);

    @Modifying
    @Transactional
    @Query(value = "delete from likes where meal_id=:mealId and user_id=:userId", nativeQuery = true)
    void deleteByMealIdAndUserId(int mealId, int userId);

    @Query(value="select count(user_id) from likes where meal_id=:mealId", nativeQuery = true)
    int getAllLikes(int mealId);
}
