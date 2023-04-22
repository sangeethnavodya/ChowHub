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


function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<PrivateRoute element={<HomePage/>}/>} />
        <Route path='/seePosts' element={<PrivateRoute element={<ShowALLPost/>}/>}/>
        <Route path='/createPosts' element={<PrivateRoute element={<CreatePost/>}/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
