import React from "react";
import { Button, Row, Space } from "antd";
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
                <div>
                    <Button type="primary" onClick={() => handleProfile()}>See your Profile</Button>
                </div>
                <div>
                    <Button type="primary" onClick={() => { navigate('/createPosts') }}>Create Post</Button>
                </div>
                <div>
                    <Button type="primary" onClick={() => { navigate('/showAllUsers') }}>Show All Users</Button>
                </div>
            </Row>
            <SeePost />
        </>
    )
}
export default HomePage