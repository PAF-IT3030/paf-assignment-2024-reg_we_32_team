package com.foodies.foodiesbackend.controller;

import com.foodies.foodiesbackend.DTO.LoginDTO;
import com.foodies.foodiesbackend.DTO.UserDto;
import com.foodies.foodiesbackend.entity.User;
import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    // POST endpoint to add a new user
    @PostMapping("/save")
    public User addUser(@RequestBody UserDto userDto) {
        return userService.addUser(userDto);
    }

    // POST endpoint for user login
    @PostMapping("/login")
    public ApiResponse login(@RequestBody LoginDTO loginDto) {
        return userService.login(loginDto);
    }

    // GET endpoint to retrieve a user's profile by ID
    @GetMapping("/profile/{id}")
    public Optional<User> getUserProfile(@PathVariable int id) {
        return userService.getProfileData(id);
    }

    // PATCH endpoint to update user profile by ID
    @PatchMapping(value = "/profile/{id}")
    public ApiResponse updateUser(@PathVariable int id, @RequestBody UserDto userDto) {
        return userService.updateUser(id, userDto);
    }

    // GET endpoint to get total count of accounts
    @GetMapping("/accounts/count")
    public int getAccountsCount() {
        return userService.getAccountsCount();
    }

    // GET endpoint to get all user profiles
    @GetMapping("/profiles")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // GET endpoint to get all admin profiles
    @GetMapping("/admin/profiles")
    public List<User> getAllAdmins() {
        return userService.getAllAdmins();
    }

    // DELETE endpoint to delete a user account by ID
    @DeleteMapping("/account/{userId}")
    public ApiResponse deleteAccount(@PathVariable int userId) {
        return userService.deleteAccount(userId);
    }
}
