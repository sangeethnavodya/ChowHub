import {Card, Divider, Space} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import './comment.css'

function ShowComments(props) {

    const [comment1, setComment1] = useState([])

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
                    className="post-card1"
                    key={post.id}

                    cover={
                        <>
                            <Space>
                                {post.author&&<Divider>{post.author}</Divider>}
                                {post.comment && <div style={{
                                    margin:"10px"
                                }}>{post.comment}</div>}
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