package com.foodies.foodiesbackend.controller;

import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.CommentDto;
import com.foodies.foodiesbackend.entity.Comment;
import com.foodies.foodiesbackend.repository.CommentRepository;
import com.foodies.foodiesbackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class CommentController {

    // Autowiring CommentRepository to interact with comments in the database
    @Autowired
    private CommentRepository commentRepository;

    // Autowiring CommentService to handle business logic for comments
    @Autowired
    private CommentService commentService;

    // GET endpoint to retrieve all comments for a specific post
    @GetMapping("/posts/{postId}/comments")
    public List<Comment> getAllCommentsByPostId(@PathVariable(value = "postId") int postId) {
        return commentRepository.findByPostId(postId);
    }

    // POST endpoint to create a new comment for a post
    @PostMapping("/posts/{postId}/comments")
    public Comment createComment(@PathVariable(value = "postId") int postId, @RequestBody CommentDto commentDto) {
        return commentService.createComment(postId, commentDto);
    }

    // DELETE endpoint to delete a comment by its ID
    @DeleteMapping("/posts/comment/{commentId}")
    public ApiResponse deleteComment(@PathVariable int commentId) {
        return commentService.deleteComment(commentId);
    }

    // PATCH endpoint to update a comment by its ID
    @PatchMapping("/posts/comment/{commentId}")
    public ApiResponse updateComment(@PathVariable int commentId, @RequestBody CommentDto commentDto) {
        return commentService.updateComment(commentId, commentDto);
    }
}