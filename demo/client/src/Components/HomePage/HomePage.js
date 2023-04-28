import React from "react";
import {Breadcrumb, Button, Row, Space} from "antd";
import { useNavigate } from "react-router-dom";
import SeePost from "../Post/ShowPost";

function HomePage() {
    const navigate = useNavigate();
    function handleProfile() {
     navigate('/yourProf')
    }

    return (
        <>
            <Row>
                <div>
                    <Button type="primary" onClick={() => {
                        localStorage.removeItem('userId');
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('name');
                        window.location.href = '/';
                    }}

                    >Logout</Button>
                </div>
                <Space direction='horizontal' className='Nav-bar'>
                    <a href="/yourProf" className='anchor'>See your Profile</a>
                    <a href="/createPosts" className='anchor'>Create Post</a>
                    <a href="/showAllUsers" className='anchor'>Show All Users</a>
                </Space>
            </Row>
            <SeePost />
        </>
    )
}
export default HomePage