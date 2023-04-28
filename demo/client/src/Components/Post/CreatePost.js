import { PlusOutlined } from '@ant-design/icons';
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
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Header} from "antd/es/layout/layout";
const { RangePicker } = DatePicker;
const { TextArea } = Input;








function CreatePost() {
  const navigate=useNavigate()
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [image5, setImage5] = useState('')
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
        setUser({...user,"image1":result.info.url})

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
        setUser({...user,"image2":result.info.url})

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
        setUser({...user,"image3":result.info.url})
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
        setUser({...user,"image4":result.info.url})
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
        setUser({...user,"image5":result.info.url})
      }
    }
    )
    myWidget.open();
  }
 const [user,setUser]=useState({
  image1:"",
  image2:"",
  image3:"",
  image4:"",
  image5:"",
  userId:localStorage.getItem('userId'),
  userName:localStorage.getItem('name'),
  caption:""
 })

 const [react,setReact]=useState({
  postId:"",
  hahaCount:"",
  heartCount:"",
  wowCount:"",
  angryCount:"",
  sadCount:""
 })



  function handleCaption(event) {

    setUser({...user,"caption":event.target.value})

  }

  function handlePostId(e){
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
          const newReact = { ...react, postId: response.data };
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
        <Space direction='horizontal' className='Nav-bar'>
            <a href="/home" className='anchor'>News Feed</a>
            <a href="/showAllUsers" className='anchor'>Show All Users</a>
        </Space>
      <Header className='new-class-header'>
         <div>Create A Post</div>
      </Header>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"

        style={{
          maxWidth: 600,
        }}
        className='form-post'
      >
        <Form.Item label="Caption" onChange={handleCaption} name="caption" >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Button className='upload-widget' onClick={() => handleOpenWidget()}>Upload picture </Button>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Button className='upload-widget' onClick={() => handleOpenWidget1()}>Upload picture</Button>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Button className='upload-widget' onClick={() => handleOpenWidget2()}>Upload picture</Button>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Button className='upload-widget' onClick={() => handleOpenWidget3()}>Upload picture</Button>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Button className='upload-widget' onClick={() => handleOpenWidget4()}>Upload picture</Button>
        </Form.Item>

        <Button onClick={handleSubmit} style={{
            margin:"10px"
        }}>Create Post</Button>


      </Form>
    </>
  );
}
export default CreatePost