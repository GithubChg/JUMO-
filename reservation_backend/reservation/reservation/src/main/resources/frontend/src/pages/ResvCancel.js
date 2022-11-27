import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';

function ResvCancel() {
    const [auth, setAuth] = useState(false);
    
    const Menu = () => {
        return (
            <div className="menu">
                <div className="menuBtn">
                    <Link to="/resvcreate" className="menuLink">
                        예약 등록
                    </Link>
                </div>
                <div className="menuBtn">
                    <Link to="/resvview" className="menuLink">
                        예약 조회/변경
                    </Link>
                </div>
                <div className="menuBtn on">
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
        const [checked, setChecked] = useState(false);
        const [emptyCheck, setEmptyChecked] = useState(false);

        const onClickAuth = () => {
            if(name==='' || password===''||checked===false) { 
                if(name==='') {setEmptyName(true)}
                else {setEmptyName(false)}
                if(password==='') {setEmptyPassword(true)}
                else {setEmptyPassword(false)}
                if(checked===false) {setEmptyChecked(true)}
                else {setEmptyChecked(false)}
            }
            else {
                setEmptyName(false)
                setEmptyPassword(false)
                setEmptyChecked(false)
                if(name==='원규진'&&password==='1234') {
                    alert('확인되었습니다. 예약을 취소합니다.')
                    setAuth(true);
                }
                else {
                    alert('이름 또는 비밀번호가 잘못되었습니다.')
                }
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
                                onError={emptyName} 
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
                                onError={emptyPassword} 
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
                        <Stack direction="row" alignItems="center" spacing={2} mt={8}>
                            <span style={{fontSize: '18px', color: 'red'}}>정말 예약을 취소하겠습니까?</span>
                            <input 
                                type="checkbox" 
                                name="check"
                                value={checked}
                                onChange={(e) => setChecked(e.target.value)}
                                onError={emptyCheck}
                                style={{width: '20px', height: '20px'}} />
                        </Stack>
                        {emptyCheck ? <span className="error" style={{margin: '0'}}>*체크 값은 필수입니다</span> : null}
                        <div style={{marginLeft: '45%', marginTop: '50px'}}>
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
            <Header />
            <div className="box">
                <Menu />
                <div className="content">
                    <div className="guide">예약이 취소되었습니다 :(</div>
                </div>
            </div>
        </>
    );
}

export default ResvCancel;