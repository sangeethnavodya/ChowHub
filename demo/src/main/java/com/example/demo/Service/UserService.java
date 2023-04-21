package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public void save(User user) {
        userRepository.save(user);
    }

    public Optional<User> singleUser(String name){
        return userRepository.findUserByname(name);
    }

    public Optional<User> singleUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }
}
