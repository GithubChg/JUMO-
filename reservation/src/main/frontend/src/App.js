import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ResvCheck from './pages/ResvCheck';
import ResvCreate from "./pages/ResvCreate";
import ResvView from "./pages/ResvView";
import ResvCancel from "./pages/ResvCancel";
import Start from './pages/Start';
import ResvModify from './pages/ResvModify';
import Login from './pages/Login';
import MResvView from './pages/MResvView';
import MResvModify from './pages/MResvModify';
import MResvStats from './pages/MResvStats';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Start isManager={false} />} />
            <Route path="/resvcreate" element={<ResvCreate />} />
            <Route path="/resvcheck" element={<ResvCheck />} />
            <Route path="/resvview" element={<ResvView />} />
            <Route path="/resvmodify" element={<ResvModify />} />
            <Route path="/resvcancel" element={<ResvCancel />} />
            <Route path="/manager" element={<Start isManager={true} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manager/resvview" element={<MResvView />} />
            <Route path="/manager/resvmodify" element={<MResvModify />} />
            <Route path="/manager/resvstats" element={<MResvStats />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;