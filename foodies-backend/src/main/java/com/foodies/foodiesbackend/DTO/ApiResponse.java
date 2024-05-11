package com.foodies.foodiesbackend.DTO;

public class ApiResponse {

    private int status;
    private int id;
    private String message;
    private Object result;
    private String role;

    // Constructor for ApiResponse with status, message, and result
    public ApiResponse(int status, String message, Object result){
        this.status = status;
        this.message = message;
        this.result = result;
    }

    // Constructor for ApiResponse with status, id, role, message, and result
    public ApiResponse(int status, int id, String role, String message, Object result){
        this.status = status;
        this.id = id;
        this.role = role;
        this.message = message;
        this.result = result;
    }

    // Getter for status
    public int getStatus() {
        return status;
    }

    // Getter for id
    public int getId() {
        return id;
    }

    // Getter for message
    public String getMessage() {
        return message;
    }

    // Getter for role
    public String getRole() {
        return role;
    }
}
