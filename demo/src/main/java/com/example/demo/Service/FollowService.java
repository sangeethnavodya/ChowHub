package com.example.demo.Service;

import com.example.demo.Model.Comment;
import com.example.demo.Model.Follow;
import com.example.demo.Model.React;
import com.example.demo.Repository.CommentRepository;
import com.example.demo.Repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowService {
    @Autowired
    private FollowRepository followRepository;
    public void save(Follow follow) {
        followRepository.save(follow);
    }

    public List<Follow> getCount(String followId,String UserId){
        return  followRepository.getFollowByFollowerIdAndUserid(followId,UserId);
    }

    public void updateFollow(String followId,String UserId) {
        Optional<Follow> existingUser = followRepository.findByFollowerIdAndUserid(followId,UserId);
        if (existingUser.isPresent()) {
            Follow updatedFollow = existingUser.get();
            updatedFollow.setIsFollowed(false);
            followRepository.save(updatedFollow);
        } else {
            throw new RuntimeException("User not found with id: " + UserId);
        }
    }
    public void updateUNFollow(String followId,String UserId) {
        Optional<Follow> existingUser = followRepository.findByFollowerIdAndUserid(followId,UserId);
        if (existingUser.isPresent()) {
            Follow updatedFollow = existingUser.get();
            updatedFollow.setIsFollowed(true);
            followRepository.save(updatedFollow);
        } else {
            throw new RuntimeException("User not found with id: " + UserId);
        }
    }

    public List<Follow> findById(String userId){
        return followRepository.findAllByUseridAndIsFollowed(userId,true);
    }
}
