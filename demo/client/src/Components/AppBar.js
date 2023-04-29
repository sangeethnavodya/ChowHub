import React from "react";
import { useNavigate } from "react-router";
import "./appBar.css";

function AppBar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("name");
        navigate("/");
    }

    return (
        <div className="app-bar">
            <div className="app-title">ChowHub</div>
            <div className="app-logout" onClick={handleLogout}>
                Logout
            </div>
        </div>
    );
}

export default AppBar;
