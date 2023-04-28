import React from "react";
import { Button, Row, Table, Space, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SeePost from "../Post/ShowPost";

const { Header, Content } = Layout;

function HomePage() {
  const navigate = useNavigate();

  function handleProfile() {
    navigate("/yourProf");
  }

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("name");
    navigate("/");
  }

  return (
    <>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2" onClick={() => navigate("/createPosts")}>
              Create Post
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate("/showAllUsers")}>
              Show All Users
            </Menu.Item>
            <Menu.Item key="4" onClick={() => handleProfile()}>
              Your Profile
            </Menu.Item>
            <Menu.Item key="5" onClick={() => handleLogout()}>
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <SeePost />
        </Content>
      </Layout>
    </>
  );
}

export default HomePage;
