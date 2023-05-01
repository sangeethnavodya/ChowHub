package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    PasswordEncoder passwordEncoder;
    public void save(User user) {
        System.out.println(user.getPassword());
        this.passwordEncoder=new BCryptPasswordEncoder();
        String encoded_password= passwordEncoder.encode(user.getPassword());
        user.setPassword(encoded_password);
        System.out.println(user.getPassword());
        userRepository.save(user);
    }

    public Optional<User> singleUser(String name){
        return userRepository.findUserByname(name);
    }

    public Optional<User> singleUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }

    public Boolean validateUser(String email,String password){
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()){
            return false;
        }
        this.passwordEncoder=new BCryptPasswordEncoder();
        return passwordEncoder.matches(password,user.get().getPassword());
    }

    public void updateProfile(String id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setProfileURL((user.getProfileURL()));
            userRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
    public void updateBio(String id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setBio((user.getBio()));
            userRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
