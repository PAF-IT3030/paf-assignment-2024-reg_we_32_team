package com.foodies.foodiesbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok annotations for constructors, getters, and setters
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommentDto {

    private int id;        // ID of the comment
    private String comment;  // Content of the comment

}
