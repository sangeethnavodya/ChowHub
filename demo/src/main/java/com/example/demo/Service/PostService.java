package com.example.demo.Service;

import com.example.demo.Model.Post;
import com.example.demo.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    public void save(Post post) {
        postRepository.save(post);
    }

    public List<Post> get() {
       return postRepository.findAll();
    }

}