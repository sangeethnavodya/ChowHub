package com.example.demo.Repository;

import com.example.demo.Model.Comment;
import com.example.demo.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment,String> {
    //Optional<User> findUserByname(String name);

}
