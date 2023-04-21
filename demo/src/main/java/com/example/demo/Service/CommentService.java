package com.example.demo.Service;

import com.example.demo.Model.Comment;
import com.example.demo.Model.User;
import com.example.demo.Repository.CommentRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Autowired
    public List<Comment> getAllCommnets(){
        return commentRepository.findAll();
    }

//    public Optional<User> singleUser(String name){
//        return userRepository.findUserByname(name);
//    }
}