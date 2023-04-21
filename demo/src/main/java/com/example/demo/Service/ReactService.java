package com.example.demo.Service;

import com.example.demo.Model.Post;
import com.example.demo.Model.React;
import com.example.demo.Model.User;
import com.example.demo.Repository.ReactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReactService {
    @Autowired
    private ReactRepository reactRepository;
    public void saveReact(React react) {
        reactRepository.save(react);
    }



    public List<React> singleUser(String name){
        return reactRepository.findReactBypostId(name);
    }

    public void updateHaha(String id, React react) {
        Optional<React> existingUser = reactRepository.findById(id);
        if (existingUser.isPresent()) {
            React updatedUser = existingUser.get();
            updatedUser.setHahaCount(react.getHahaCount());
            reactRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
    public void updateHeart(String id, React react) {
        Optional<React> existingUser = reactRepository.findById(id);
        if (existingUser.isPresent()) {
            React updatedUser = existingUser.get();
            updatedUser.setHeartCount(react.getHeartCount());
            reactRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}
