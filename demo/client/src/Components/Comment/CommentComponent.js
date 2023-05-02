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
        author:localStorage.getItem('name')
    })
    const handleSubmit = (event) => {
        //event.preventDefault();
        //window.location.reload()
        console.log(comment1)
        try {
            //backEndApi
            axios.post('http://localhost:8080/comment/save', comment1)
                .then(response => {
                    console.log(response.data);
                    axios.post('http://localhost:8080/notifications', {
                        "userId": props.data.userId,
                        "message": localStorage.getItem('name') + " commented on your post",
                        "seen": false
                    })
                        .then(response => {
                            console.log(response.data);
                            window.location.reload()
                        }
                        )
                        .catch(error => {
                            console.error(error);
                        }
                        );
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
            <Button style={{color:'blue'}} onClick={handleSubmit}>Comment</Button>
        </div>
    )

}

export default CommentComponent