package com.example.demo.Repository;

import com.example.demo.Model.Comment;
import com.example.demo.Model.Follow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends MongoRepository<Follow,String> {

    List<Follow> getFollowByFollowerIdAndUserid(String followerId,String userid);

    Optional<Follow> findByFollowerIdAndUserid(String followerId, String userid);

    List<Follow> findAllByUseridAndIsFollowed(String userId,Boolean isFollowed);



}
