package com.foodies.foodiesbackend.repository;

import com.foodies.foodiesbackend.entity.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
    //    @Query(value = "SELECT w.id, w.image, w.workout_workoutName, w.post_workoutDescription, count(l.workout_idadd) from workout w inner join likes l on l.workout_id = w.id where w.uid = :uid", nativeQuery = true)
    List<Status> findAllByUser_Id(int uid);

    Status findStatusById(int id);

    void deleteByIdAndUserId(int id, int postId);

    Status findById(int statusId);

    @Query(value = "select count(id) from likes where status_id = :statusId and user_id = :userId", nativeQuery = true)
    int findByStatusIdAndUserId(int statusId, int userId);

    @Modifying
    @Transactional
    @Query(value = "insert into likes (status_id, user_id) values (:statusId, :userId)", nativeQuery = true)
    void addLike(int statusId, int userId);

    @Modifying
    @Transactional
    @Query(value = "delete from likes where status_id=:statusId and user_id=:userId", nativeQuery = true)
    void deleteByStatusIdAndUserId(int statusId, int userId);

    @Query(value="select count(user_id) from likes where status_id=:statusId", nativeQuery = true)
    int getAllLikes(int statusId);
}
