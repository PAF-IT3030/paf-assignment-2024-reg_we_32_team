package com.foodies.foodiesbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok annotations for constructors, getters, and setters
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostFeedDto {

    private int id;                  // ID of the post
    private String postDescription;  // Description of the post
    private byte[] image;            // Image byte array of the post
    private int user_post_pk;        // ID of the user who posted the post

}
