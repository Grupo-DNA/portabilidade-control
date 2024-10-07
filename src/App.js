import React from 'react';
import UploadFormPage from './pages/UploadFormPage';
import LoadingPage from './pages/loadingPage';
import InfoSection from './components/infoSection';
import MainPage from './pages/compatibilityfinalPage';
import ErrorPage from './pages/ErrorPage';
import EcosystemPage from './pages/aboutUS';
import CompatibilityPage from './pages/CompatibilidadePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './style.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadFormPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path='/compatibility' element={<CompatibilityPage/>} />
        <Route path='/ecosystem' element={<MainPage/>} />
      </Routes>
    </Router>
  );
}
export default App;

