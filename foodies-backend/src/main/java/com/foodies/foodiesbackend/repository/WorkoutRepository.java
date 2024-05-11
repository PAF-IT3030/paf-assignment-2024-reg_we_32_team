package com.foodies.foodiesbackend.repository;

import com.foodies.foodiesbackend.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

    //    @Query(value = "SELECT w.id, w.image, w.workout_workoutName, w.post_workoutDescription, count(l.workout_idadd) from workout w inner join likes l on l.workout_id = w.id where w.uid = :uid", nativeQuery = true)
    List<Workout> findAllByUser_Id(int uid);

    Workout findWorkoutById(int id);

    void deleteByIdAndUserId(int id, int postId);

    Workout findById(int workoutId);

    @Query(value = "select count(id) from likes where workout_id = :workoutId and user_id = :userId", nativeQuery = true)
    int findByWorkoutIdAndUserId(int workoutId, int userId);

    @Modifying
    @Transactional
    @Query(value = "insert into likes (workout_id, user_id) values (:workoutId, :userId)", nativeQuery = true)
    void addLike(int workoutId, int userId);

    @Modifying
    @Transactional
    @Query(value = "delete from likes where workout_id=:workoutId and user_id=:userId", nativeQuery = true)
    void deleteByWorkoutIdAndUserId(int workoutId, int userId);

    @Query(value="select count(user_id) from likes where workout_id=:workoutId", nativeQuery = true)
    int getAllLikes(int workoutId);
}
