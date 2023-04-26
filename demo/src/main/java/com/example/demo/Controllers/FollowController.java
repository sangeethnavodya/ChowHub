package com.example.demo.Controllers;

import com.example.demo.Model.Follow;
import com.example.demo.Model.Post;
import com.example.demo.Service.FollowService;
import com.example.demo.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/follow")
public class FollowController {
    @Autowired
    private FollowService followService;

    @PostMapping(value = "/upload" ,consumes = "application/json")
    public String saveUser(@RequestBody Follow follow) {
        followService.save(follow);
        return follow.getId();
    }
    @GetMapping("/{followerId}/{userId}")
    public List<Follow> getCount(@PathVariable String followerId,@PathVariable String userId){
        return  followService.getCount(followerId,userId);
    }

    @PutMapping("/{follwerId}/{userId}")
    public void updateUnfollow(@PathVariable String follwerId,@PathVariable String userId){
        followService.updateFollow(follwerId,userId);
    }
    @PutMapping("/unfollow/{follwerId}/{userId}")
    public void updatefollow(@PathVariable String follwerId,@PathVariable String userId){
        followService.updateUNFollow(follwerId,userId);
    }

    @GetMapping("/getByUser/{userId}")
    public List<Follow> get(@PathVariable String userId){
        return  followService.findById(userId);
    }
}
