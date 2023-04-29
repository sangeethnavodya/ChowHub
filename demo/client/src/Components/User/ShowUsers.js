import {Breadcrumb, Button, Card, Image, Space} from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../User/user.css'
import { useNavigate } from "react-router";
import AppBar from "../AppBar";
import MenuBar from "../MenuBar";

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
        <>
        <AppBar/>
            <MenuBar/>
        <div className="vvv">

            <div>
            {user.map((post, index) => (
                <Space direction={"horizontal"} >
                    <Card
                        className="profile-card"
                        key={post.id}
                        style={{
                            width: 500,
                            height: 300,
                        }}

                    >
                        <div className='flex-div' style={{ display: 'flex', alignItems: 'center' }}>
                            {post.profileURL && <Image src={post.profileURL} style={{ width: 200, height: 150 }} />}
                            <Meta title={post.name} className="instagram-name" style={{ marginLeft: '10px' }} />
                            <Button onClick={() => handleFollow(post)} style={{ marginLeft: 'auto' }}>View profile</Button>
                        </div>


                    </Card>
                </Space>

            ))}
            </div>
        </div>
        </>
    )

}

export default ShowUsers