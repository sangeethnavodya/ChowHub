import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
    const navigate = useNavigate();
    return (
        <div>
            <Button type="primary" onClick={() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('name');
                navigate('/login', { replace: true });
            }}
            >Logout</Button>
        </div>
    )
}
export default HomePage