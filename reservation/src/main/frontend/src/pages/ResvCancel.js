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
        const onClickAuth = () => {
            setAuth(true);
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
                            <TextField label="" variant="outlined" size="small" style={{width: '120px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="이름" />
                        </Stack>
                        <Stack direction="row" alignItems="center" className="subcontent" mt={2}>
                            <div className="subtitle">비밀번호</div>
                            <TextField type="password" label="" variant="outlined" size="small" style={{width: '150px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="" />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2} mt={8}>
                            <span style={{fontSize: '18px', color: 'red'}}>정말 예약을 취소하겠습니까?</span>
                            <input type="checkbox" style={{width: '20px', height: '20px'}} />
                        </Stack>
                        <div style={{marginLeft: '45%', marginTop: '50px'}}>
                            <button className="btn" onClick={onClickAuth}>확인</button>
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