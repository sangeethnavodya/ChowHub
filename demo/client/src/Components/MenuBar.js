import React, { useState } from "react";
import { Drawer, Button, Menu, Layout } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import "./sideMenu.css";

const { Header } = Layout;

function SideMenu() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleMenuClick = (path) => {
        navigate(path);
        setVisible(false);
    };

    return (
        <>
            <Header className="app-header">

                <Button
                    type="primary"
                    onClick={() => setVisible(true)}
                    icon={<MenuOutlined />}
                />
                <Drawer
                    title={showNotifications ? "Notifications" : "Menu"}
                    placement="left"
                    onClose={() => {
                        setShowNotifications(false);
                        setVisible(false);
                    }}
                    visible={visible}
                >
                    {showNotifications ? (
                        <Notification />
                    ) : (
                        <Menu defaultSelectedKeys={["1"]} mode="inline">
                            <Menu.Item key="1" onClick={() => handleMenuClick("/")}>
                                Home
                            </Menu.Item>
                            <Menu.Item
                                key="2"
                                onClick={() => handleMenuClick("/showAllUsers")}
                            >
                                Show All Users
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => handleMenuClick("/createPosts")}>
                                Create Post
                            </Menu.Item>
                            <Menu.Item key="4" onClick={() => handleMenuClick("/yourProf")}>
                                Profile
                            </Menu.Item>
                            <Menu.Item
                                key="5"
                                onClick={() => {
                                    setShowNotifications(true);
                                }}
                            >
                                Notifications
                            </Menu.Item>
                        </Menu>
                    )}
                </Drawer>
            </Header>
        </>
    );
}

export default SideMenu;
