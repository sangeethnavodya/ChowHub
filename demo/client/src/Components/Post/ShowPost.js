import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import '../Post/post.css'
import { SmileOutlined, HeartOutlined, StarOutlined, MehOutlined } from '@ant-design/icons';




function ShowALLPost() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await axios.get('http://localhost:8080/post/get');
            console.log(response.data);
            setPost(response.data);
        }

        fetchPosts();
    }, []);

    return (
        <div>
            {post.map((p) => (
                <Card className="post-card"
                    key={p.id}
                    style={{ width: 300 }}
                    cover={
                        <>
                            {p.image1 && <img alt="example" src={p.image1} />}
                            {p.image2 && <img alt="example" src={p.image2} />}
                            {p.image3 && <img alt="example" src={p.image3} />}
                            {p.image4 && <img alt="example" src={p.image4} />}
                            {p.image5 && <img alt="example" src={p.image5} />}
                        </>
                    }
                >
                    <Meta
                        title={p.caption}

                    />
                     <div>
      <SmileOutlined className="emoji-haha" />
      <HeartOutlined className="emoji-wow" />
      <StarOutlined className="emoji-like" />
      <MehOutlined className="emoji-sad" />
    </div>
                </Card>
            ))}

        </div>
    );
}

export default ShowALLPost;
