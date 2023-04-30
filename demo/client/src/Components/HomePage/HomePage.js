import React from "react";
import { Layout } from "antd";
import SeePost from "../Post/ShowPost";
import AppBar from "../AppBar";
import MenuBar from "../MenuBar";

const { Content } = Layout;

function HomePage() {
  return (
      <>
        <Layout>
          <AppBar/>
            <MenuBar />
          <Content>
            <SeePost />
          </Content>
        </Layout>
      </>
  );
}

export default HomePage;
