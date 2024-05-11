package com.foodies.foodiesbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

// Lombok annotations for constructors, getters, and setters
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PostDto {

    private String postDescription;  // Description of the post
    private MultipartFile image;     // Image file of the post
    private int likes;               // Number of likes for the post

}
