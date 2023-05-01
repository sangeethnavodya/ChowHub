import {PlusOutlined} from '@ant-design/icons';
import '../Post/create.css'
import {
    Button, Card,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select, Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Header} from "antd/es/layout/layout";
import AppBar from "../AppBar";
import MenuBar from "../MenuBar";
import Background from "./background";

const {RangePicker} = DatePicker;
const {TextArea} = Input;


function CreatePost() {
    const navigate = useNavigate()
    const [image1, setImage1] = useState('')
    const [isImage1, setIsImage1] = useState(false)
    const [image2, setImage2] = useState('')
    const [isImage2, setIsImage2] = useState(false)
    const [image3, setImage3] = useState('')
    const [isImage3, setIsImage3] = useState(false)
    const [image4, setImage4] = useState('')
    const [isImage4, setIsImage4] = useState(false)
    const [image5, setImage5] = useState('')
    const [isImage5, setIsImage5] = useState(false)

    const [caption, setCaption] = useState('')


    const [componentDisabled, setComponentDisabled] = useState(true);

    function handlePost(event) {
        event.preventDefault()
    }

    function handleOpenWidget() {
        var myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dugke0heo',
                uploadPreset: 'nxlpfvfq'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setImage1(result.info.url)
                    setIsImage1(true)
                    setUser({...user, "image1": result.info.url})

                }
            }
        )
        myWidget.open();
    }

    function handleOpenWidget1() {
        var myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dugke0heo',
                uploadPreset: 'nxlpfvfq'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setImage2(result.info.url)
                    setIsImage2(true)
                    setUser({...user, "image2": result.info.url})

                }
            }
        )
        myWidget.open();
    }

    function handleOpenWidget2() {
        var myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dugke0heo',
                uploadPreset: 'nxlpfvfq'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setImage3(result.info.url)
                    setIsImage3(true)
                    setUser({...user, "image3": result.info.url})
                }
            }
        )
        myWidget.open();
    }

    function handleOpenWidget3() {

        var myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dugke0heo',
                uploadPreset: 'nxlpfvfq'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setImage4(result.info.url)
                    setIsImage4(true)
                    setUser({...user, "image4": result.info.url})
                }
            }
        )
        myWidget.open();
    }

    function handleOpenWidget4() {
        var myWidget = window.cloudinary.createUploadWidget({
                cloudName: 'dugke0heo',
                uploadPreset: 'nxlpfvfq'
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    setImage5(result.info.url)
                    setIsImage5(true)
                    setUser({...user, "image5": result.info.url})
                }
            }
        )
        myWidget.open();
    }

    const [user, setUser] = useState({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        userId: localStorage.getItem('userId'),
        userName: localStorage.getItem('name'),
        caption: ""
    })

    const [react, setReact] = useState({
        postId: "",
        hahaCount: "",
        heartCount: "",
        wowCount: "",
        angryCount: "",
        sadCount: ""
    })


    function handleCaption(event) {

        setUser({...user, "caption": event.target.value})

    }

    function handlePostId(e) {
        setReact(prevState => {
            return {...prevState, "postId": e};
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user)
        try {
            axios.post('http://localhost:8080/post/upload', user)
                .then(response => {
                    console.log(response.data);
                    handlePostId(response.data);
                    const newReact = {...react, postId: response.data};
                    axios.post('http://localhost:8080/react/set', newReact)
                        .then(response => {
                            console.log(response.data)
                        })
                        .then(() => {
                            navigate("/home");
                        })
                        .catch(error => {
                            console.error(error);
                        });
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <AppBar/>
            <MenuBar/>
            {/*<Header className='new-class-header'>*/}
            {/*   <div>Create A Post</div>*/}
            {/*</Header>*/}

            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
            >
                <Form.Item
                    style={{
                        width: "1200px",
                        marginLeft: "300px",
                        marginTop: "20px",
                        marginBottom: "20px",

                        justifyContent:"center",
                        alignItems:"center"

                    }}
                    onChange={handleCaption}
                    placeholder="input new Caption here"
                >
                    <TextArea rows={4} placeholder="Enter a caption"/>
                </Form.Item>


                <Space direction="horizontal" style={{width: "900px", marginLeft: "300px"}}>
                    <Space direction="horizontal">
                        <div style={{height: "60px"}}>
                            <Button onClick={() => handleOpenWidget()}>
                                Upload picture 1
                            </Button>
                            {isImage1 && <div style={{color: "red"}}> uploaded</div>}
                        </div>
                        <div style={{height: "60px"}}>
                            {isImage1 && <Button onClick={() => handleOpenWidget1()}>
                                Upload picture 2
                                {isImage2 && <div style={{color: "red"}}> uploaded</div>}
                            </Button>}
                        </div>

                        <div style={{height: "60px"}}>
                            {isImage2 && <Button onClick={() => handleOpenWidget2()}>
                                Upload picture 3
                                {isImage3 && <div style={{color: "red"}}> uploaded</div>}
                            </Button>}
                        </div>

                        <div style={{height: "60px"}}>
                            {isImage3 && <Button onClick={() => handleOpenWidget3()}>
                                Upload picture 4
                                {isImage4 && <div style={{color: "red"}}> uploaded</div>}
                            </Button>}
                        </div>

                        <div style={{height: "60px"}}>
                            {isImage4 && <Button onClick={() => handleOpenWidget4()}>
                                Upload picture 4
                                {isImage5 && <div style={{color: "red"}}> uploaded</div>}
                            </Button>}
                        </div>
                    </Space>


                </Space>

                <Button onClick={handleSubmit} style={{
                    marginLeft: "10px",
                    marginTop: "20px"
                }}>
                    Create Post
                </Button>
            </Form>

            <Background/>
        </>
    );
}

export default CreatePost