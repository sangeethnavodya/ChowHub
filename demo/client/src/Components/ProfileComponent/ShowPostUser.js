import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactComponent from "../Post/ReactComponent";
import ShowComments from "../Comment/ShowComment";
import CommentComponent from "../Comment/CommentComponent";
import {Breadcrumb, Card} from "antd";
import ShowCommentsMY from "../Comment/ShowMyProfileComment";

function ShowPostUser() {
    const [postList, setPostList] = useState([]);
    const [postDetails, setPostDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/post/' + localStorage.getItem('userId'));
            setPostList(response.data);
            setIsLoading(false);
            console.log(response)
        }
        fetchData();
    }, []);
    if (isLoading) {
        return <div>Loading post details...</div>;
    }
    return (
        <>

            {postList.map((post, index) => (

                <Card
                    className="post-card"
                    key={post.id}
                    style={{ width: 300 }}
                    cover={
                        <>
                            {post.image1 && <img alt="example" src={post.image1} />}
                            {post.image2 && <img alt="example" src={post.image2} />}
                            {post.image3 && <img alt="example" src={post.image3} />}
                            {post.image4 && <img alt="example" src={post.image4} />}
                            {post.image5 && <img alt="example" src={post.image5} />}
                        </>
                    }
                >
                    <Meta title={post.userName} />
                    <Meta title={post.caption} />
                    <ReactComponent data={post} />
                    <ShowCommentsMY data={post} />
                    <CommentComponent data={post} />

                </Card>
            ))}
        </>
    );

}

export default ShowPostUser;