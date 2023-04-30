package com.example.demo.Service;

import com.example.demo.Model.Notification;
import com.example.demo.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    public void save(Notification notification) {
        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationByuserId(String userId) {
        return notificationRepository.findAllUnseenNotificationByUserId(userId);
    }

}