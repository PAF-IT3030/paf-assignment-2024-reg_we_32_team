package com.foodies.foodiesbackend.service;


import com.foodies.foodiesbackend.entity.Status;
import com.foodies.foodiesbackend.DTO.ApiResponse;
import com.foodies.foodiesbackend.DTO.StatusDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface StatusService {
    ApiResponse saveStatus(int id, StatusDto statusDto) throws IOException;

    List<Status> getUserStatuses(int id);

    List<Status> getAllStatuses();

    ApiResponse deleteStatus(int statusID);

    ApiResponse updateStatus(int SId, StatusDto statusDto) throws IOException;

    ApiResponse addLikeUnlike(int statusId, int userId);

    int getAllLikes(int statusId);

    int getStatusesCount();
}
