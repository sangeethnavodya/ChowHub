import {Button, Card, Divider, Space} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import './comment.css'
import UCommentComponent from "./update";

function ShowComments(props) {
    //postEkeMekaCallkrlAthi
    const [comment1, setComment1] = useState([])
    const [enableDelete,setDelete]=useState([])
    const [enableU,setEnableU]=useState(false)
    const [setU,setSetU]=useState(true)
    useEffect(() => {
        async function fetchData() {
           //databaseCallToGetExistingComments
            const response = await axios.get(`http://localhost:8080/comment/${props.data.id}`);
            console.log(response.data);
            //StoreValues
            setComment1(response.data)
        }

        fetchData();
    }, [props.data.id]);

    function handleDelete(e){
       axios.delete('http://localhost:8080/comment/'+e);
       window.location.reload();
    }
    function handleUpdate(){
       setEnableU(true)
        setSetU(false)
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
                                <div>
                                {post.author==localStorage.getItem('name')&&<div
                                style={{
                                    height:"80px"
                                }}>
                                    <Space direction='horizontal'>
                                        {setU&&
                                            <Space direction='horizontal'>
                                        <Button style={{
                                            display:"flex",
                                            justifyContent:"center",
                                            alignItems:"center",
                                            marginLeft:"50px",
                                            color:'red',
                                            marginTop:"30px"
                                        }} onClick={()=>handleDelete(post.id)}>Delete</Button>

                                            <div>
                                                <Button style={{
                                                    display:"flex",
                                                    justifyContent:"center",
                                                    alignItems:"center",
                                                    marginLeft:"50px",
                                                    marginTop:"30px"
                                                }} onClick={()=>handleUpdate(post.id)}>Update</Button>
                                            </div>
                                            </Space>
                                        }
                                        {enableU&&<UCommentComponent data={post}/>
                                        }
                                    </Space>
                                </div>}
                                </div>
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