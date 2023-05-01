package com.example.demo.Service;

import com.example.demo.Model.Comment;
import com.example.demo.Model.React;
import com.example.demo.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    public void save(Comment comment) {
        commentRepository.save(comment);
    }

    @Autowired
    public List<Comment> getAllCommnets(){
        return commentRepository.findAll();
    }

    public List<Comment> getCommentByPostID(String postId) {
        return commentRepository.findCommentByPostid(postId);
    }

    public void DeleteComment(String id){
        commentRepository.deleteById(id);
    }

    public void updateCaption(String id, Comment react) {
        Optional<Comment> existingUser = commentRepository.findById(id);
        if (existingUser.isPresent()) {
            System.out.println("d");
            Comment updatedUser = existingUser.get();
            updatedUser.setComment(react.getComment());
            commentRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }
}