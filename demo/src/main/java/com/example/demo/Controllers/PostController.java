package com.example.demo.Controllers;

import com.example.demo.Model.Post;
import com.example.demo.Model.React;
import com.example.demo.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping(value = "/upload" ,consumes = "application/json")
    public String saveUser(@RequestBody Post post) {

        postService.save(post);
        return post.getId();
    }


    @GetMapping(value = "/get")
    public List<Post> getPost(){
        return postService.get();
    }

    @GetMapping(value = "/{userId}")
    public List<Post> getByUser(@PathVariable String userId){
        return postService.getByPost(userId);
    }


}
