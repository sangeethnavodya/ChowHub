package com.example.demo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    private String id;
    private String caption;
    private String userId;
    private String image1;
    private String image2;
    private String image3;
    private String image4;
    private String image5;
    private String userName;


}
