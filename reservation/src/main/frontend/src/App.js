import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ResvCheck from './pages/ResvCheck';
import ResvCreate from "./pages/ResvCreate";
import Start from './pages/Start';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/resvcreate" element={<ResvCreate />} />
            <Route path="/resvcheck" element={<ResvCheck />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;