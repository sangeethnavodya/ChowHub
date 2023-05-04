import { Button, Card, Form, Image, Space } from "antd";
import axios from "axios";
import react, { useEffect, useState } from "react";
import "../ProfileComponent/profile.css";
import ShowPostUser from "../ProfileComponent/ShowPostUser";
import ShowOtherUser from "./ShowOtherUser";
import AppBar from "../AppBar";
import MenuBar from "../MenuBar";

function Profile() {
  const [details, setdetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [FollowBTN, setFollowBTN] = useState("Follow");
  const [isFollow, setIsFollow] = useState(false);
  const [needToInit, setneedToInit] = useState(false);

  const [count, setCount] = useState([]);

  const [image, setImage] = useState({
    profileURL: "",
  });
  const [not, setNot] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await axios
        .get("http://localhost:8080/user/" + localStorage.getItem("otherName"))
        .then((user) => {
          console.log(user);
          setIsLoading(false);
          setdetails(user);
          if (details.length > 0) {
            if (user.data.profileURL !== null) {
              setNot(true);
            }
          }
        });
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function getCount() {
      await axios
        .get(
          "http://localhost:8080/follow/getByUser/" +
            localStorage.getItem("otherId")
        )
        .then((u) => {
          console.log(u.data);
          setCount(u.data);
        });
    }

    getCount();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading2(true);
      await axios
        .get(
          "http://localhost:8080/follow/" +
            localStorage.getItem("userId") +
            "/" +
            localStorage.getItem("otherId")
        )
        .then((user) => {
          console.log(user);
          if (Object.keys(user.data).length === 0) {
            console.log("d");
            setIsLoading2(false);
            setFollowBTN("Follow");
            setneedToInit(true);
            setIsFollow(false);
          } else if (!user.data[0].isFollowed) {
            setFollowBTN("Follow");
            setneedToInit(false);
            setIsLoading2(false);
            setIsFollow(false);
          } else if (user.data[0].isFollowed) {
            setFollowBTN("Unfollow");
            setneedToInit(false);
            setIsFollow(true);
            setIsLoading2(false);
          } else {
            setIsLoading(false);
            setFollowBTN("Unfollow");
            setneedToInit(false);
            setIsFollow(true);
            setIsLoading2(false);
          }
        });
    }

    fetchData();
  }, []);
  const [Follow, setFollow] = useState({
    isFollowed: true,
    followerId: localStorage.getItem("userId"),
    userid: localStorage.getItem("otherId"),
  });

  if (isLoading) {
    return <div>Loading post details...</div>;
  }
  if (isLoading2) {
    return <div>Loading post details...</div>;
  }

  function handleFollow() {
    //window.location.reload();
    if (needToInit) {
      axios.post("http://localhost:8080/follow/upload", Follow);
      setneedToInit(false);
      setFollowBTN("Unfollow");
    } else if (!needToInit && isFollow) {
      axios.put(
        "http://localhost:8080/follow/" +
          localStorage.getItem("userId") +
          "/" +
          localStorage.getItem("otherId")
      )
          .then((res) => {
              console.log('followed');
                axios.post('http://localhost:8080/notifications', {
                  "userId": localStorage.getItem("otherId"),
                  "message": localStorage.getItem('name') + " has unfollowed you",
                  "seen": false
                })
                    .then(response => {
                          console.log(response.data);
                          //window.location.reload()
                        }
                    )
                    .catch(error => {
                          console.error(error);
                        }
                    );
          }
            );
      setFollowBTN("Follow");
    } else if (!needToInit && !isFollow) {
      axios.put(
        "http://localhost:8080/follow/unfollow/" +
          localStorage.getItem("userId") +
          "/" +
          localStorage.getItem("otherId")
      )
            .then((res) => {
                console.log('unfollowed');
                axios.post('http://localhost:8080/notifications', {
                    "userId": localStorage.getItem("otherId"),
                    "message": localStorage.getItem('name') + " has followed you",
                    "seen": false
                })
                    .then(response => {
                            console.log(response.data);
                            //window.location.reload()
                        }
                    )
                    .catch(error => {
                            console.error(error);
                        }
                    );
            }
            );
      setFollowBTN("UnFollow");
    }
  }

  return (
    <div>
      <AppBar />
      <MenuBar />
      <Card className="profile-pic">
        <Image
          src={details.data.profileURL}
          height="100px"
          width="100px"
          alt="Profile"
        />
      </Card>
      <Card style={{display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"black",
        fontSize:"20px",
        fontFamily:"sans-serif",
        marginTop:"20px"
      }}>
        <div style={{display:"flex",
          justifyContent:"center",
          alignItems:"center",
          color:"black",
          fontSize:"20px",
          fontFamily:"sans-serif",
          marginTop:"20px"
        }}>Bio</div>

        {}<div>{details.data.bio}</div>
      </Card>

      <Card className="name-label">
        <Space direction="horizontal">
          <h1>{details.data.name}'s Profile</h1>
          <Button onClick={() => handleFollow()}>{FollowBTN}</Button>
          <Card>{count.length}</Card>
        </Space>
      </Card>

      <Card className="name-label">
        <ShowOtherUser />
      </Card>
    </div>
  );
}

export default Profile;
