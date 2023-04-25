package com.example.demo.Repository;

import com.example.demo.Model.Post;
import com.example.demo.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post,String> {
    List<Post> findAll();
    List<Post> findAllByUserId(String userId);
}
