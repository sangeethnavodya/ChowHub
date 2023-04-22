import { Button, Input } from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";
import axios from "axios";
import React, { useState } from "react";
import '../Comment/comment.css'

function CommentComponent(props) {
    
    const [comment1, setComment] = useState({
        postid: props.data.id,
        userId: "",
        comment: "",
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(comment1)
        try {
            axios.post('http://localhost:8080/comment/save', comment1)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }

    function handleCaption(event) {
        const value = event.target.value;
        console.log(value);
        // use the value for further processing
        setComment({...comment1,"comment":event.target.value})
        
      }
    return (
        <div>
            <Input placeholder="Enter Your Comment" className="comment-input" onChange={handleCaption} />
            <Button className="comment-button" onClick={handleSubmit}>Comment</Button>
        </div>
    )

}

export default CommentComponent