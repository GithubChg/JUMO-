import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import axios from 'axios';
import ResvViewContent from '../components/ResvViewContent';

function ResvView() {  
    const [auth, setAuth] = useState(false);
    const [id, setId] = useState('');

    const Menu = () => {
        return (
            <div className="menu">
                <div className="menuBtn">
                    <Link to="/resvcreate" className="menuLink">
                        예약 등록
                    </Link>
                </div>
                <div className="menuBtn on">
                    <Link to="/resvview" className="menuLink">
                        예약 조회/변경
                    </Link>
                </div>
                <div className="menuBtn">
                    <Link to="/resvcancel" className="menuLink">
                        예약 취소
                    </Link>
                </div>
            </div>
        );
    };

    function UserAuth() {
        const [name, setName] = useState('');
        const [emptyName, setEmptyName] = useState(false);
        const [password, setPassword] = useState('');
        const [emptyPassword, setEmptyPassword] = useState(false);

        const onClickAuth = () => {
            if(name==='' || password==='') { 
                if(name==='') {setEmptyName(true)}
                else {setEmptyName(false)}
                if(password==='') {setEmptyPassword(true)}
                else {setEmptyPassword(false)}
            }
            else {
                setEmptyName(false)
                setEmptyPassword(false)
                axios({
                    url: "/api/verifyUser",
                    method: 'post',
                    data: {
                        userName: name,
                        password: password,
                    },
                    baseUrl: "http://localhost:8080"
                }).then((res) => {
                    console.log(res.data)
                    if(res.data!=="NULL") {
                        setId(res.data)
                        setAuth(true)
                        alert('확인되었습니다. 예약을 조회합니다.')
                    } else {
                        setAuth(false)
                        alert('이름 또는 비밀번호가 잘못되었습니다.')
                    }
                    setId(res.data)
                    console.log({"auth":auth, "res":res.data, "id":id})
                })
            }
        };
    
        return (
            <>
                <Header />
                <div className="box">
                    <Menu />
                    <div className="content" style={{minWidth: '1000px'}}>
                        <div className="guide">예약자 정보를 입력하세요</div>
                        <Stack direction="row" alignItems="center" className="subcontent" mt={5}>
                            <div className="subtitle">이름</div>
                            <TextField
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label="" 
                                variant="outlined" 
                                size="small" 
                                style={{width: '120px'}} 
                                inputProps={{style: {fontSize: '14px'}}} 
                                placeholder="이름" />
                        </Stack>
                        {emptyName ? <span className="error">*이름을 입력하세요</span> : null}
                        <Stack direction="row" alignItems="center" className="subcontent" mt={2}>
                            <div className="subtitle">비밀번호</div>
                            <TextField 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" 
                                label="" 
                                variant="outlined" 
                                size="small" 
                                style={{width: '150px'}} 
                                inputProps={{style: {fontSize: '14px'}}} 
                                placeholder="" />
                        </Stack>
                        {emptyPassword ? <span className="error">*비밀번호를 입력하세요</span> : null}
                        <div style={{marginLeft: '45%', marginTop: '100px'}}>
                            <button variant="outlined" className="btn" onClick={onClickAuth}>확인</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        auth===false ?
        <UserAuth /> :
        <>
            <ResvViewContent id={id} />
        </>
    );
}

export default ResvView;