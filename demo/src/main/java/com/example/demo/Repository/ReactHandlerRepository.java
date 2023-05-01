package com.example.demo.Repository;

import com.example.demo.Model.Post;
import com.example.demo.Model.ReactHandler;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReactHandlerRepository extends MongoRepository<ReactHandler,String> {

    public List<ReactHandler> findByReactIdAndAndReactorIdAndPostId(String reactId,String reactorId,String postId);
}
