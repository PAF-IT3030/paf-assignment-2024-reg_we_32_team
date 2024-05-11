package com.foodies.foodiesbackend.controller;

import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.StatusDto;
import com.foodies.foodiesbackend.entity.Status;
import com.foodies.foodiesbackend.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class StatusController {
    private final StatusService statusService;

    // Constructor injection of WorkoutService
    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    // POST endpoint to save a new workout
    @PostMapping("/statuses/{id}")
    public ApiResponse saveStatus(@PathVariable int id, @ModelAttribute StatusDto statusDto) throws IOException {
        return statusService.saveStatus(id, statusDto);
    }

    // GET endpoint to retrieve workouts of a user
    @GetMapping("/statuses/{id}")
    public List<Status> getUserStatuses(@PathVariable int id) { return statusService.getUserStatuses(id);}

    // GET endpoint to retrieve all workouts
    @GetMapping("/statuses")
    public List<Status> getAllStatuses() {
        return statusService.getAllStatuses(); // Call the instance method on the instance
    }

    // DELETE endpoint to delete a workout
    @DeleteMapping("/statuses/{statusId}")
    public ApiResponse deleteStatus(@PathVariable int statusId) {
        return statusService.deleteStatus(statusId);
    }

    // PATCH endpoint to update a workout
    @PatchMapping(value = "/status/{statusId}")
    public ApiResponse updateStatus(@PathVariable int statusId, @ModelAttribute StatusDto StatusDto) throws IOException {
        return statusService.updateStatus(statusId, StatusDto);
    }

    // POST endpoint to add or remove like on a workout
    @PostMapping("/statuses/{statusId}/likes/{userId}")
    public ApiResponse addLikeUnlike(@PathVariable int statusId, @PathVariable int userId) {
        return statusService.addLikeUnlike(statusId, userId);
    }

    // GET endpoint to get total likes on a workout
    @GetMapping("/statuses/{statusId}/likes")
    public int getAllLikes(@PathVariable int statusId) {
        return statusService.getAllLikes(statusId);
    }

    // GET endpoint to get total count of workouts
    @GetMapping("/statuses/count")
    public int getStatusesCount() {
        return statusService.getStatusesCount();
    }
}
