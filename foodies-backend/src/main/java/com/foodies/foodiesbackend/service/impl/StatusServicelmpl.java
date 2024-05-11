package com.foodies.foodiesbackend.service.impl;


import com.foodies.foodiesbackend.entity.Status;
import com.foodies.foodiesbackend.entity.User;
import com.foodies.foodiesbackend.repository.StatusRepository;
import com.foodies.foodiesbackend.repository.UserRepository;
import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.StatusDto;
import com.foodies.foodiesbackend.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class StatusServicelmpl implements StatusService {
    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ApiResponse saveStatus(int id, StatusDto statusDto) throws IOException {
        Status status1 = new Status();

        //post1.findPostByUpk(id);
        User user = userRepository.findUserById(id);
        status1.setUser(user);
        status1.setStatusName(statusDto.getStatusName());
        status1.setStatusDescription(statusDto.getStatusDescription());
        byte[] imageContent = statusDto.getImage().getBytes();
        status1.setImage(imageContent);

        statusRepository.save(status1);
        return new ApiResponse(200, "Status added successfully", false);
    }

    @Override
    public List<Status> getUserStatuses(int uid) {
        return statusRepository.findAllByUser_Id(uid);
    }

    @Override
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    @Override
    public ApiResponse deleteStatus(int statusId) {
        Status status = statusRepository.findStatusById(statusId);
        statusRepository.delete(status);
        return new ApiResponse(200, "status deleted successfully", false);
    }

    @Override
    public ApiResponse updateStatus(int statusId, StatusDto statusDto) throws IOException {
        Status status = statusRepository.findById(statusId);
        if(status == null){
            return new ApiResponse(404, "Post does not exist", false);
        }else {
            Status updateStatus = status;
            updateStatus.setStatusName(statusDto.getStatusName());
            updateStatus.setStatusDescription(statusDto.getStatusDescription());
            byte[] imageContent = statusDto.getImage().getBytes();
            updateStatus.setImage(imageContent);
            statusRepository.save(status);
            return new ApiResponse(200, "Status updated successfully", false);
        }
    }

    @Override
    public ApiResponse addLikeUnlike(int statusId, int userId){
        int liked = statusRepository.findByStatusIdAndUserId(statusId, userId);
        if(liked == 0){
            statusRepository.addLike(statusId, userId);
            return new ApiResponse(200, "Workout liked successfully", false);
        }else {
            statusRepository.deleteByStatusIdAndUserId(statusId, userId);
            return new ApiResponse(200, "Status unliked successfully", false);
        }
    }

    @Override
    public int getAllLikes(int statusId){
        return statusRepository.getAllLikes(statusId);
    }

    @Override
    public int getStatusesCount() {
        return (int) statusRepository.count();
    }

}
