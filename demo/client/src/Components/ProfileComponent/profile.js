import {Breadcrumb, Button, Card, Form, Image, Space} from 'antd';
import axios from 'axios'
import react, {useEffect, useState} from 'react'
import '../ProfileComponent/profile.css'
import ShowPostUser from './ShowPostUser';
import {Header} from "antd/es/layout/layout";
import React from "react";
import AppBar from "../AppBar";
import MenuBar from "../MenuBar";

function Profile() {
    const [details, setdetails] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isUpload, setIsUpload] = useState(false)
    const [image, setImage] = useState({
        profileURL: "",
    })
    const [not, setNot] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            await axios.get('http://localhost:8080/user/' + localStorage.getItem('name')).then(user => {
                console.log(user)
                setIsLoading(false)
                setdetails(user)
                if (user.data.profileURL !== null) {
                    setNot(true)
                }
            });
        }

        fetchData()
    }, []);
    if (isLoading) {
        return <div>Loading post details...</div>;
    }

    function handleOpenWidget() {
        var myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dugke0heo',
                uploadPreset: 'nxlpfvfq'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setImage({...image, "profileURL": result.info.url})
                    setIsUpload(true)
                }
            }
        )
        myWidget.open();
    }

    function handleUpload() {
        axios.put('http://localhost:8080/user/' + localStorage.getItem('userId'), image).then(
            upload => {
                console.log(upload)
                window.location.reload();
            }
        )
    }

    return (
        <>
            <AppBar/>
            <MenuBar/>
        <div className='main-div-profile'>
            <Card className='name-label'>
                <Header className='new-class-header'>{details.data.name}'s Profile</Header>
            </Card>
            <Space>

                {not && (
                    <Card className='profile-pic'>
                        <Image
                            src={details.data.profileURL}
                            height='200px'
                            width='200px'
                            alt='Profile'
                        />
                    </Card>
                )}
                {!not && (
                    <Card className='profile-pic'>
                        <Image
                            src=''
                            height='150px'
                            width='150px'
                            alt='Profile Placeholder'
                        />
                    </Card>
                )}
                <div className='upload-div'>
                    <Form.Item  valuePropName='fileList' className='upload-pro-widget'>
                        <Button  onClick={() => handleOpenWidget()}>
                            Upload Picture
                        </Button>
                    </Form.Item>
                    {isUpload && (
                        <Button onClick={() => handleUpload()} className='upload-button'>
                            Upload Your Profile
                        </Button>
                    )}
                </div>
            </Space>


            <Card className='name-label'>
                <ShowPostUser/>
            </Card>
        </div>
            </>
    )

}

export default Profile