import logo from './logo.svg';
import './App.css';
import CreatePost from './Components/Post/CreatePost';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import ShowALLPost from './Components/Post/ShowPost';
import Login from './Components/login/Login';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/seePosts' element={<ShowALLPost/>}/>
        <Route path='/createPost' element={<CreatePost/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
