package com.example.demo.Service;

import com.example.demo.Model.Comment;
import com.example.demo.Model.Post;
import com.example.demo.Model.React;
import com.example.demo.Repository.PostRepository;
import com.example.demo.Repository.ReactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Post> getByPost(String userId){return postRepository.findAllByUserId(userId);}


    public void DeleteComment(String id) {
        postRepository.deleteById(id);
    }

    public void updateCaption(String id, Post post) {
        Optional<Post> existingUser = postRepository.findById(id);
        if (existingUser.isPresent()) {
            System.out.println("d");
            Post updatedUser = existingUser.get();
            if(post.getImage1()!=null){
            updatedUser.setImage1(post.getImage1());
            }
            if(post.getImage1()==null){
                updatedUser.setImage1(null);
            }
            if(post.getImage2()==null){
                updatedUser.setImage2(null);
            }
            if(post.getImage3()==null){
                updatedUser.setImage3(null);
            }
            if(post.getImage4()==null){
                updatedUser.setImage4(null);
            }
            if(post.getImage5()==null){
                updatedUser.setImage5(null);
            }
            if(post.getImage2()!=null) {
                updatedUser.setImage2(post.getImage2());
            }
            if(post.getImage3()!=null) {
                updatedUser.setImage3(post.getImage3());
            }
            if(post.getImage4()!=null) {
                updatedUser.setImage4(post.getImage4());
            }
            if(post.getImage5()!=null) {
                updatedUser.setImage5(post.getImage5());
            }
            if(post.getCaption()!=null) {
                updatedUser.setCaption(post.getCaption());
            }
            postRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}
