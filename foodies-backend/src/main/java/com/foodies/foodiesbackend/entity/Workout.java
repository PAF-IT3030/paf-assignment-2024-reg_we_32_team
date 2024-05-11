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
@Entity(name = "WorkoutEntity")
@Table(name = "workout")
public class Workout {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "workout_name", length = 255, nullable = true)
    private String workoutName;

    @Column(name = "workout_description", length = 255, nullable = true)
    private String workoutDescription;

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
        return "Workout{" +
                "id=" + id +
                ", workoutName='" + workoutName + '\'' +
                ", workoutDescription='" + workoutDescription + '\'' +
                ", user=" + user +
                ", comment=" + comment +
                '}';
    }
}
