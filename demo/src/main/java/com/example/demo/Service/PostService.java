package com.example.demo.Service;

import com.example.demo.Model.Post;
import com.example.demo.Repository.PostRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    public void save(Post post) {
        postRepository.save(post);
    }
}
