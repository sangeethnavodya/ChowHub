package com.example.demo.Repository;

import com.example.demo.Model.Post;
import com.example.demo.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post,String> {
}
