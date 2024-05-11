package com.foodies.foodiesbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "meal")
@Table(name = "meal")
public class Meal {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "meal_name", length = 255, nullable = true)
    private String mealName;

    @Column(name = "meal_description", length = 255, nullable = true)
    private String mealDescription;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    @JsonIgnore
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Comment> comment;

    @JsonIgnore
    @OneToMany(mappedBy = "post_id")
    private List<Likes> likes;

    @Override
    public String toString() {
        return "Meal{" +
                "id=" + id +
                ", mealName='" + mealName + '\'' +
                ", mealDescription='" + mealDescription + '\'' +
                ", user=" + user +
                ", comment=" + comment +
                '}';
    }
}
