import React from "react";
import { Button, Row, Space } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function HomePage() {
    const navigate = useNavigate();
    return (
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
        <Button type="primary" onClick={() =>{}}> Profile</Button>
    </div>
            <div>
                <Button type="primary" onClick={() =>{navigate('/createPosts')}}>Create Post</Button>
            </div>
        </Row>
    )
}
export default HomePage