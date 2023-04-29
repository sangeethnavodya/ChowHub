import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

import "../Post/post.css";
import ReactComponent from "./ReactComponent";
import CommentComponent from "../Comment/CommentComponent";
import ShowComments from "../Comment/ShowComment";

function PostList() {
  const [postList, setPostList] = useState([]);
  const [postDetails, setPostDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState("");
  const [popupWidth, setPopupWidth] = useState(0);
  const [popupHeight, setPopupHeight] = useState(0);


  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/post/get");
      setPostList(response.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleImageClick = (src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      const aspectRatio = naturalWidth / naturalHeight;
      let width = 300;
      let height = 300;
      if (naturalWidth > naturalHeight) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
      setShowPopup(true);
      setPopupImageSrc(src);
      setPopupWidth(width);
      setPopupHeight(height);
      document.body.classList.add("popup-open");
    };
  };


  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupImageSrc("");
    document.body.classList.remove("popup-open");
  };

  if (isLoading) {
    return <div>Loading post details...</div>;
  }

  return (
      <>
        <div className={`popup-container ${showPopup ? "active" : ""}`} onClick={handlePopupClose}>
          {showPopup && (
              <div className="popup-image-container" style={{ width: popupWidth, height: popupHeight }}>
                <img className="popup-image" src={popupImageSrc} alt="popup" />
              </div>
          )}
        </div>

        <div className="post-list-container">
          {postList.map((post, index) => (
              <Card className="post-card" key={post.id}>
                <div className="image-grid">
                  {post.image1 && (
                      <img
                          alt="example"
                          src={post.image1}
                          onClick={() => handleImageClick(post.image1)}
                      />
                  )}
                  {post.image2 && (
                      <img
                          alt="example"
                          src={post.image2}
                          onClick={() => handleImageClick(post.image2)}
                      />
                  )}
                  {post.image3 && (
                      <img
                          alt="example"
                          src={post.image3}
                          onClick={() => handleImageClick(post.image3)}
                      />
                  )}
                  {post.image4 && (
                      <img
                          alt="example"
                          src={post.image4}
                          onClick={() => handleImageClick(post.image4)}
                      />
                  )}
                  {post.image5 && (
                      <img
                          alt="example"
                          src={post.image5}
                          onClick={() => handleImageClick(post.image5)}
                      />
                  )}
                </div>
                <Meta title={post.userName} />
                <Meta title={post.caption} />
                <ReactComponent data={post} />
                <ShowComments data={post} />
                <CommentComponent data={post} />
              </Card>
          ))}
        </div>
      </>
  );
}

export default PostList;
