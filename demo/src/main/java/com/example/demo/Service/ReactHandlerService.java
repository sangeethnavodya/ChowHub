package com.example.demo.Service;

import com.example.demo.Model.React;
import com.example.demo.Model.ReactHandler;
import com.example.demo.Repository.ReactHandlerRepository;
import com.example.demo.Repository.ReactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReactHandlerService {

    @Autowired
    private ReactHandlerRepository reactHandlerRepository;
    public void saveReact(ReactHandler react) {
        reactHandlerRepository.save(react);
    }

    public List<ReactHandler> findReactor(String reactId,String reactorId,String postId){
        List<ReactHandler> r=reactHandlerRepository.findByReactIdAndAndReactorIdAndPostId(reactId,reactorId,postId);
        return r;
    }
}
