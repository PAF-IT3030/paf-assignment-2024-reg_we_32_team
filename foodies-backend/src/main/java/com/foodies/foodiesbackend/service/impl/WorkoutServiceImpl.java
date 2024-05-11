package com.foodies.foodiesbackend.service.impl;


import com.foodies.foodiesbackend.entity.Workout;
import com.foodies.foodiesbackend.entity.User;
import com.foodies.foodiesbackend.repository.WorkoutRepository;
import com.foodies.foodiesbackend.repository.UserRepository;
import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.WorkoutDto;
import com.foodies.foodiesbackend.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

import java.util.List;

@Service
@Transactional
public class WorkoutServiceImpl implements WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse saveWorkout(int id, WorkoutDto workoutDto) throws IOException {
        Workout workout1 = new Workout();

        //post1.findPostByUpk(id);
        User user = userRepository.findUserById(id);
        workout1.setUser(user);
        workout1.setWorkoutName(workoutDto.getWorkoutName());
        workout1.setWorkoutDescription(workoutDto.getWorkoutDescription());
        byte[] imageContent = workoutDto.getImage().getBytes();
        workout1.setImage(imageContent);

        workoutRepository.save(workout1);
        return new ApiResponse(200, "workout added successfully", false);
    }

    @Override
    public List<Workout> getUserWorkouts(int uid) {
        return workoutRepository.findAllByUser_Id(uid);
    }

    @Override
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @Override
    public ApiResponse deleteWorkout(int workoutId) {
        Workout workout = workoutRepository.findWorkoutById(workoutId);
        workoutRepository.delete(workout);
        return new ApiResponse(200, "workout deleted successfully", false);
    }

    @Override
    public ApiResponse updateWorkout(int workoutId, WorkoutDto workoutDto) throws IOException {
        Workout workout = workoutRepository.findById(workoutId);
        if(workout == null){
            return new ApiResponse(404, "Post does not exist", false);
        }else {
            Workout updateWorkout = workout;
            updateWorkout.setWorkoutName(workoutDto.getWorkoutName());
            updateWorkout.setWorkoutDescription(workoutDto.getWorkoutDescription());
            byte[] imageContent = workoutDto.getImage().getBytes();
            updateWorkout.setImage(imageContent);
            workoutRepository.save(workout);
            return new ApiResponse(200, "workout updated successfully", false);
        }
    }

    @Override
    public ApiResponse addLikeUnlike(int workoutId, int userId){
        int liked = workoutRepository.findByWorkoutIdAndUserId(workoutId, userId);
        if(liked == 0){
            workoutRepository.addLike(workoutId, userId);
            return new ApiResponse(200, "Workout liked successfully", false);
        }else {
            workoutRepository.deleteByWorkoutIdAndUserId(workoutId, userId);
            return new ApiResponse(200, "Workout unliked successfully", false);
        }
    }

    @Override
    public int getAllLikes(int workoutId){
        return workoutRepository.getAllLikes(workoutId);
    }

    @Override
    public int getWorkoutsCount() {
        return (int) workoutRepository.count();
    }
}
