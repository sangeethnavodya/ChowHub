package com.example.demo.Controllers;

import com.example.demo.Model.Notification;
import com.example.demo.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // GET all notifications
    @GetMapping("/{userId}")
    public List<Notification> getAllNotifications(@PathVariable String userId) {
        return notificationRepository.findByUserIdAndSeenFalse(userId);
    }

    // POST a new notification
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification savedNotification = notificationRepository.save(notification);
        return new ResponseEntity<>(savedNotification, HttpStatus.CREATED);
    }

    // PUT an existing notification
    @PutMapping("/{notificationId}")
    public ResponseEntity<Notification> updateNotification(@PathVariable String notificationId) {
        System.out.println(notificationId);
        Notification existingNotification = notificationRepository.findById(notificationId)
                .orElseThrow();

        existingNotification.setSeen(true);

        Notification updatedNotification = notificationRepository.save(existingNotification);
        return new ResponseEntity<>(updatedNotification, HttpStatus.OK);
    }

}
