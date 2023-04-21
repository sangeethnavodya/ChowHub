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
public class React {
    @Id
    private String id;
    private String postId;
    private String user_id;
    private int hahaCount;
    private int heartCount;
    private int wowCount;
    private int angryCount;
    private int sadCount;

}
