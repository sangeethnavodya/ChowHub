package com.example.demo.Repository;

import com.example.demo.Model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findAllUnseenNotificationByUserId(String userId);

    List<Notification> findByUserIdAndSeenFalse(String userId);
}
