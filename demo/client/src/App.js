import logo from './logo.svg';
import './App.css';
import CreatePost from './Components/Post/CreatePost';
import React from 'react';
import HomePage from './Components/HomePage/HomePage';
import ShowALLPost from './Components/Post/ShowPost';
import Login from './Components/login/Login';
import Signup from "./Components/login/Signup";
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './Components/login/PrivateRoute';
import Profile from './Components/ProfileComponent/profile';
import ShowUsers from './Components/User/ShowUsers';
import ShowPostOther from './Components/User/ShowUserProfile';
import image from './Components/User/bjpeg.jpeg';



function App() {
  return (
    <div className="vv" >
      <Routes>
        <Route path='/home' element={<PrivateRoute element={<HomePage/>}/>} />
        <Route path='/seePosts' element={<PrivateRoute element={<ShowALLPost/>}/>}/>
        <Route path='/createPosts' element={<PrivateRoute element={<CreatePost/>}/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/yourProf' element={<PrivateRoute element={<Profile/>}/>}/>
        <Route path='/showAllUsers' element={<PrivateRoute element={<ShowUsers/>}/>}/>
        <Route path='/profileOther' element={<PrivateRoute element={<ShowPostOther/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
