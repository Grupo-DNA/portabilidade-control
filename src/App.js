import React from 'react';
import UploadFormPage from './pages/UploadFormPage';
import LoadingPage from './pages/loadingPage';
import MainPage from './pages/compatibilityfinalPage';
import ErrorPage from './pages/ErrorPage';
import CompatibilityPage from './pages/CompatibilidadePage';
import Footer from './pages/footer';
import GerenciarPortabilidade from './pages/gerenciarPortabilidade';
import AvancoPortabilidade from './pages/avancoPortabilidade';
import MultiplaPort from './pages/multiplaPort';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './style.css'


function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<UploadFormPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path='/compatibility' element={<CompatibilityPage/>} />
            <Route path='/ecosystem' element={<MainPage/>} />
            <Route path='/gerenciarPortabilidade' element={<GerenciarPortabilidade />} />
            <Route path='/avancoPortabilidade' element={<AvancoPortabilidade />} />
            <Route path='/multiplaPort' element={<MultiplaPort />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}
export default App;

