package com.example.demo.Service;

import com.example.demo.Model.Comment;
import com.example.demo.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}