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
@Entity(name = "workout")
@Table(name = "workout")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "status_name", length = 255, nullable = true)
    private String statusName;

    @Column(name = "status_description", length = 255, nullable = true)
    private String statusDescription;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    @JsonIgnore
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "post_id")
    private List<Likes> likes;

    @Override
    public String toString() {
        return "Status{" +
                "id=" + id +
                ", statusName='" + statusName + '\'' +
                ", statusDescription='" + statusDescription + '\'' +
                ", user=" + user +
                '}';
    }
}
