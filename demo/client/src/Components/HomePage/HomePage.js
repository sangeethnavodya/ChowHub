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
                <Breadcrumb
                    items={[
                        {
                            title: 'Home',
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
            </Row>
            <SeePost />
        </>
    )
}
export default HomePage