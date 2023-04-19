package com.example.demo.Controllers;

import com.cloudinary.Cloudinary;
import com.example.demo.DTO.postDto;
import com.example.demo.Model.Post;
import com.example.demo.Model.User;
import com.example.demo.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping(value = "/upload")
    public String saveUser(@RequestBody Post post) {
        postService.save(post);
        return post.getId();
    }


}
