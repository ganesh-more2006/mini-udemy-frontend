import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import MyCourses from './pages/MyCourses';
import CourseView from './pages/CourseView';
import ForgotPass from './pages/ForgotPass';

function App() {
 
  return (
    <Router>
      <Toaster position="top-right" />
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course-view/:id" element={<CourseView />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        
      </Routes>
    </Router>
  );
}

export default App;


