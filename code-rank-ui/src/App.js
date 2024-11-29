import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Problems from './components/Problems/Problems';
import ProblemDetail from './components/ProblemDetail/ProblemDetail';
import Home from './components/Home/Home';
import './App.css';
import UserProfile from './components/Profile/UserProfile';
import ContestPage from './pages/contest';
import ContestDetail from './components/Contest/ContestDetail';
import CoursesPage from './pages/courses';
import CoursesDetailPage from './pages/coursesDetail';
import LessonDetailPage from './pages/lessonDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Thêm Header component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path='/contests/:id' element={<ContestDetail />} />
          <Route path='/contests' element={<ContestPage />} />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/courses/:courseID' element={<CoursesDetailPage />} />
          <Route path='/courses/:courseID/lessons/:lessonId' element={<LessonDetailPage />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
