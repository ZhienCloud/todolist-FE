import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationToolbar from './components/NavigationToolbar';
import CreateToDoList from './components/CreateToDoList';
import Register from './components/RegisterToDoList';
import Login from './components/LoginToDoList';
import Profile from './components/Profile';
import Home from './components/Home'

const App = () => {
  return (
    <>
      <NavigationToolbar />
      {/* <NavigationToolbar isLoggedIn={isLoggedIn} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist/new" element={<CreateToDoList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
