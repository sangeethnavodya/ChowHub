package com.example.demo.Controllers;

import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping(value = "/save")
    public String saveUser(@RequestBody User user) {
      userService.save(user);
      return user.getId();
    }
    @GetMapping(value = "/{name}")
     public ResponseEntity<Optional<User>> signIn(@PathVariable String name){
         return new ResponseEntity<Optional<User>>(userService.singleUser(name), HttpStatus.OK);
    }
}