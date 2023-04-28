import React, { useEffect, useState } from 'react';
import {Button, Card, Space} from 'antd';
import axios from 'axios';
import '../ProfileComponent/profile.css';
import ShowOtherUser from './ShowOtherUser';
import ShowPostUser from '../ProfileComponent/ShowPostUser';
import {Header} from "antd/es/layout/layout";

function Profile() {
    const [details, setDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isFollow, setIsFollow] = useState(false);
    const [followBtnText, setFollowBtnText] = useState('Follow');

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/user/${localStorage.getItem('otherName')}`);
                const userData = response.data;
                setDetails(userData);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/follow/${localStorage.getItem('userId')}/${localStorage.getItem('otherId')}`);
                const followData = response.data[0];
                if (!followData) {
                    setIsFollow(false);
                    setFollowBtnText('Follow');
                } else {
                    setIsFollow(followData.isFollowed);
                    setFollowBtnText(followData.isFollowed ? 'Unfollow' : 'Follow');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    function handleFollow() {
        if (!isFollow) {
            axios.post('http://localhost:8080/follow/upload', {
                isFollowed: true,
                followerId: localStorage.getItem('userId'),
                userid: localStorage.getItem('otherId')
            });
            setFollowBtnText('Unfollow');
            setIsFollow(true);
        } else {
            axios.put(`http://localhost:8080/follow/${localStorage.getItem('userId')}/${localStorage.getItem('otherId')}`, {
                isFollowed: false
            });
            setFollowBtnText('Follow');
            setIsFollow(false);
        }
    }

    return (
        <div>
            {isLoading ? (
                <div>Loading post details...</div>
            ) : (
                <>
                    <Space direction='horizontal'>
                        <Card className="profile-pic">
                            <img src={details.profileURL} height="100px" width="100px" alt="Profile" />
                        </Card>
                        <Header className="new-class-header">
                            <h1>{details.name}'s Profile</h1>
                            <Button onClick={handleFollow}>{followBtnText}</Button>
                        </Header>

                    </Space>

                    <Card className="name-label">
                        <ShowOtherUser />
                    </Card>
                </>
            )}
        </div>
    );
}

export default Profile;
