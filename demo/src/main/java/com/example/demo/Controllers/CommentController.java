package com.example.demo.Controllers;

import com.example.demo.Model.Comment;
import com.example.demo.Model.React;
import com.example.demo.Model.User;
import com.example.demo.Service.CommentService;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping(value = "/save")
    public String saveComment(@RequestBody Comment comment) {
        commentService.save(comment);
        return comment.getId();
    }
    @GetMapping("/show")
    public String showcomments(){
        List<Comment> commentList= commentService.getAllCommnets();
        return commentList.toString();
    }
    @GetMapping(value = "/{postId}")
    public List<Comment> getHaha(@PathVariable String postId){
        System.out.println(postId);
        return commentService.getCommentByPostID(postId);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id){
        System.out.println(id);
        commentService.DeleteComment(id);
    }
}