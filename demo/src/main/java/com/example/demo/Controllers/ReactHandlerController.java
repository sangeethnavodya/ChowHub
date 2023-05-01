package com.example.demo.Controllers;

import com.example.demo.Model.React;
import com.example.demo.Model.ReactHandler;
import com.example.demo.Service.ReactHandlerService;
import com.example.demo.Service.ReactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/rHandler")
public class ReactHandlerController {
    @Autowired
    private ReactHandlerService reactHandlerService;
    @PostMapping(value = "/set" ,consumes = "application/json")
    public String saveUser(@RequestBody ReactHandler react) {
        reactHandlerService.saveReact(react);
        return react.getId();
    }
    @GetMapping(value = "/find/{reactId}/{reactorId}/{postId}")
    public List<ReactHandler> get(@PathVariable String reactId, @PathVariable String reactorId, @PathVariable String postId){

        return reactHandlerService.findReactor(reactId,reactorId,postId);
    }

    @DeleteMapping(value = "/find/{reactId}/{reactorId}/{postId}")
    public List<ReactHandler> delete(@PathVariable String reactId, @PathVariable String reactorId, @PathVariable String postId){

        return reactHandlerService.deleteReact(reactId,reactorId,postId);
    }
}
