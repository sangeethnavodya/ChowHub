import {Breadcrumb, Button, Card} from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../User/user.css'
import { useNavigate } from "react-router";

function ShowUsers() {
    const [postList, setPostList] = useState([]);
    const [user, setUserDetails] = useState([]);
    const [followe,setFollowDetails]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    function handleFollow(post) {
        localStorage.setItem('otherId', post.id);
        localStorage.setItem('otherName', post.name);
        navigate('/profileOther')
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8080/user');
            setUserDetails(response.data);
            setIsLoading(false);
            console.log(response)
        }
        fetchData();
    }, []);




    if (isLoading) {
        return <div className="v-t">Loading post details...</div>;
    }
    if (!isLoading) {
        user.map((item, index) => {
            if (item.id === localStorage.getItem('userId')) {
                setUserDetails(user.filter((item) => item.id !== localStorage.getItem('userId')));
            }
        })
    }
    return (

        <div className="vvv">
            <Breadcrumb
                items={[
                    {
                        title: <a href="/home">Home</a>,
                    },
                    {
                        title: <a href="/yourProf">See your Profile</a>
                    },
                    {
                        title: <a href="/createPosts">Create Post</a>,
                    },
                    {
                        title: <a href="/showAllUsers">Show All Users</a>,
                    },
                ]}
                className='Nav-bar'/>
            {user.map((post, index) => (

                <Card
                    className="profile-card"
                    key={post.id}
                    style={{
                        width: 1200,
                        height: 300,
                    }}
                    cover={
                        <>
                            {post.profileURL && (
                                <img
                                    alt="example"
                                    style={{
                                        height: '100px',
                                        width: '200px',
                                        marginLeft: '500px'
                                    }}
                                    src={post.profileURL}
                                />
                            )}
                        </>
                    }
                >
                    <Meta title={post.name} className="instagram-name" />
                    <Button onClick={() => handleFollow(post)}>View profile</Button>
                </Card>
            ))}
        </div>
    )

}

export default ShowUsers