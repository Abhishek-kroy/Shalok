import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import StoryGallery from './pages/StoryGallery';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HindiPoemEditor from './pages/HindiPoetryEditor';
import MyProfile from './pages/MyProfile/MyProfile';
import StoryView from './pages/StoryView';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <Router>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/kavita" element={<StoryGallery isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/texteditor" element={<HindiPoemEditor isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/myProfile" element={<MyProfile isDark={isDark} setIsDark={setIsDark} />} />
        <Route path="/story/:id" element={<StoryView isDark={isDark} setIsDark={setIsDark} />} />
      </Routes>
    </Router>
  );
}

export default App;