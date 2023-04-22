import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ShowComments(props) {

  const [comment1,setComment1]=useState([])

    useEffect(() => {
        async function fetchData() {
        
          const response = await axios.get(`http://localhost:8080/comment/${props.data.id}`);
          console.log(response.data);
          setComment1(response.data)
        }
        fetchData();
      }, [props.data.id]);

    return (
        <div>
           {comment1.map((post, index) => (
        <Card
          className="post-card"
          key={post.id}
          style={{ width: 300 }}
          cover={
            <>
              {post.comment && <div>{post.comment}</div>}
            </>
          }
        > 
        </Card>
      ))}
        </div>
    )
}

export default ShowComments