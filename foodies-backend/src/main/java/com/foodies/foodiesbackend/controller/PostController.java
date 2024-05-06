package com.foodies.foodiesbackend.controller;

import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.PostDto;
import com.foodies.foodiesbackend.entity.Post;
import com.foodies.foodiesbackend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class PostController {

    private final PostService postService;

    // Constructor injection of PostService
    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // POST endpoint to save a new post
    @PostMapping("/posts/{id}")
    public ApiResponse savePost(@PathVariable int id, @ModelAttribute PostDto postDto) throws IOException {
        return postService.savePost(id, postDto);
    }

    // GET endpoint to retrieve posts of a user
    @GetMapping("/posts/{id}")
    public List<Post> getUserPosts(@PathVariable int id) {
        return postService.getUserPosts(id);
    }

    // GET endpoint to retrieve all posts
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // DELETE endpoint to delete a post
    @DeleteMapping("/posts/{postId}")
    public ApiResponse deletePost(@PathVariable int postId) {
        return postService.deletePost(postId);
    }

    // PATCH endpoint to update a post
    @PatchMapping(value = "/post/{postId}")
    public ApiResponse updatePost(@PathVariable int postId, @ModelAttribute PostDto postDto) throws IOException {
        return postService.updatePost(postId, postDto);
    }

    // POST endpoint to add or remove like on a post
    @PostMapping("/posts/{postId}/likes/{userId}")
    public ApiResponse addLikeUnlike(@PathVariable int postId, @PathVariable int userId) {
        return postService.addLikeUnlike(postId, userId);
    }

    // GET endpoint to get total likes on a post
    @GetMapping("/posts/{postId}/likes")
    public int getAllLikes(@PathVariable int postId) {
        return postService.getAllLikes(postId);
    }

    // GET endpoint to get total count of posts
    @GetMapping("/posts/count")
    public int getPostsCount() {
        return postService.getPostsCount();
    }
}
