import React from 'react';
import UploadFormPage from './pages/UploadFormPage';
import LoadingPage from './pages/loadingPage';
import InfoSection from './components/infoSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './style.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div><UploadFormPage /><InfoSection /></div>} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </Router>
  );
}
export default App;

