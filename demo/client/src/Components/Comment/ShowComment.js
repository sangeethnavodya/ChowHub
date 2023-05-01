import {Button, Card, Divider, Space} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import './comment.css'

function ShowComments(props) {

    const [comment1, setComment1] = useState([])
    const [enableDelete,setDelete]=useState([])

    useEffect(() => {
        async function fetchData() {

            const response = await axios.get(`http://localhost:8080/comment/${props.data.id}`);
            console.log(response.data);

            setComment1(response.data)
        }

        fetchData();
    }, [props.data.id]);

    function handleDelete(e){
       axios.delete('http://localhost:8080/comment/'+e);
       window.location.reload()
    }

    return (
        <div>
            {comment1.map((post, index) => (
                <Card
                    className="post-card1"
                    key={post.id}

                    cover={
                        <>
                            <Space>
                                {post.author&&<Divider>{post.author}</Divider>}
                                {post.comment && <div style={{
                                    margin:"10px"
                                }}>{post.comment}</div>}
                                {post.author==localStorage.getItem('name')&&<div>
                                    <Button style={{
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"center",
                                        marginLeft:"50px"
                                    }} onClick={()=>handleDelete(post.id)}>Delete</Button>
                                </div>}
                            </Space>

                        </>
                    }
                >
                </Card>
            ))}
        </div>
    )
}

export default ShowComments