import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ResvCheck from './pages/ResvCheck';
import ResvCreate from "./pages/ResvCreate";
import ResvView from "./pages/ResvView";
import ResvCancel from "./pages/ResvCancel";
import Start from './pages/Start';
import ResvModify from './pages/ResvModify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/resvcreate" element={<ResvCreate />} />
            <Route path="/resvcheck" element={<ResvCheck />} />
            <Route path="/resvview" element={<ResvView />} />
            <Route path="/resvmodify" element={<ResvModify />} />
            <Route path="/resvcancel" element={<ResvCancel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;