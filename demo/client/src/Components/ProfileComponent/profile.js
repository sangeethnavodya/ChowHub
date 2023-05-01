import {Breadcrumb, Button, Card, Form, Image, Space} from 'antd';
import axios from 'axios'
import react, {useEffect, useState} from 'react'
import '../ProfileComponent/profile.css'
import ShowPostUser from './ShowPostUser';
import {Header} from "antd/es/layout/layout";
import React from "react";
import AppBar from "../AppBar";
import MenuBar from "../MenuBar";
import TextArea from "antd/es/input/TextArea";

function Profile() {
    const [details, setdetails] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isUpload, setIsUpload] = useState(false)
    const [bioS, setBio] = useState({
        bio: ""
    });
    const [image, setImage] = useState({
        profileURL: "",
    })
    const [not, setNot] = useState(true)
    const [bnot, setBNot] = useState(true)

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
                if (user.data.bio !== null) {
                    setBNot(true)
                }
                if (user.data.bio !== null) {
                    setBNot(false)
                }
                if (user.data.bio === null) {
                    console.log("e")
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

    function handleCaption(event) {

        setBio({...bioS, "bio": event.target.value})

    }

    function handleUpload() {
        axios.put('http://localhost:8080/user/' + localStorage.getItem('userId'), image).then(
            upload => {
                console.log(upload)
                window.location.reload();
            }
        )
    }
    function handleBio(){
        axios.put('http://localhost:8080/user/bio/' + localStorage.getItem('userId'), bioS).then(
            upload => {
                console.log(upload)
                window.location.reload();
            }
        )
    }
    function handleButton(){
        setBNot(true)
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
                    <Form.Item valuePropName='fileList' className='upload-pro-widget'>
                        <Button onClick={() => handleOpenWidget()}>
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

            <Space style={{
                backgroundColor: "white",
                padding: "40px",
                marginLeft: "30px",

            }}>
                <div>
                    {
                        !bnot&&
                        <div>
                            <div style={{color:"black",
                                fontSize:"20px",
                                width:"700px",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }}>
                                {details.data.bio}


                            </div>
                            <Button onClick={()=>handleButton()}
                            style={{
                                marginTop:"30px",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }}>Update Bio</Button>
                        </div>


                    }

                    {
                        bnot && <div>
                            <Form.Item
                                label="Caption"
                                onChange={handleCaption}
                                name="caption"
                                style={{
                                    width:"700px",

                                }}
                            >
                                <TextArea rows={2} placeholder="Enter a Bio"/>
                            </Form.Item>
                            <Button onClick={() => handleBio()} >Add a Bio</Button>
                        </div>

                }


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