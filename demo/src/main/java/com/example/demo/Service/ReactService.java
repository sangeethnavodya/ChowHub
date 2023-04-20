package com.example.demo.Service;

import com.example.demo.Model.React;
import com.example.demo.Model.User;
import com.example.demo.Repository.ReactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReactService {
    @Autowired
    private ReactRepository reactRepository;
    public void saveReact(React react) {
        reactRepository.save(react);
    }



    public Optional<React> singleUser(String name){
        return reactRepository.findReactBypostId(name);
    }
}
