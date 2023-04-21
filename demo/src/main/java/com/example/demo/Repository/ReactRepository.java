package com.example.demo.Repository;

import com.example.demo.Model.Post;
import com.example.demo.Model.React;
import com.example.demo.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ReactRepository extends MongoRepository<React,String> {

    List<React> findReactBypostId(String postId);
}
