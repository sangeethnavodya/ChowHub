package com.example.demo.Controllers;

import com.example.demo.Model.User;
import com.example.demo.Service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@Controller
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> login(@RequestBody User user, HttpSession session){
        System.out.println(user);
        try{
            Boolean ok = userService.validateUser(user.getEmail(),user.getPassword());
            if(ok) {
                System.out.println("login ok");
                session.setAttribute("name", user.getName());
                session.setAttribute("id", user.getId());
                return new ResponseEntity<Optional<User>>(userService.singleUserByEmail(user.getEmail()), HttpStatus.OK);
            }
//            Optional<User> u = userService.singleUserByEmail(user.getEmail());
//            if(u.isPresent()){
//                if(Objects.equals(u.get().getPassword(), user.getPassword())){
//                    System.out.println("login ok");
//                    session.setAttribute("name",u.get().getName());
//                    session.setAttribute("id",u.get().getId());
//                    return new ResponseEntity<Optional<User>>(u,HttpStatus.OK);
//                }
                System.out.println("login fail");
                return new ResponseEntity<Optional<User>>(HttpStatus.UNAUTHORIZED);
//            }else{
//                System.out.println("login fail");
//                return new ResponseEntity<Optional<User>>(HttpStatus.UNAUTHORIZED);
//            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<Optional<User>>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Optional<User>> logout(HttpSession session){
        session.removeAttribute("name");
        session.removeAttribute("id");
        return new ResponseEntity<Optional<User>>(HttpStatus.OK);
    }
}
