import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';

function ResvView() {  
    const [auth, setAuth] = useState(false);

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
            <Header />
            <div className="box">
                <Menu />
                <div className="content">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <div className="guide">예약 조회</div>
                        <Link to="/resvmodify" className="btn" style={{padding: '6px 15px', marginBottom: '15px', borderRadius: '8px', textDecoration: 'none'}}>변경</Link>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <div style={{minWidth: '500px'}}>
                            <div className="title">예약 정보</div>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">날짜 및 시간</div>
                                <div className="contentcheck">2022-11-19</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">인원</div>
                                <div className="contentcheck">3 명</div>
                            </Stack>
                            <Stack direction="row" alignItems="start" className="subcheck" mt={2}>
                                <div>
                                    <div className="subtitle">메뉴</div>
                                    <div style={{color: "#5B9BD5", fontSize: "12px", marginTop: '10px'}}>총 68,000원</div>
                                </div>
                                <Stack spacing={1}>
                                    <div className="contentcheck">메뉴1 (2개)</div>
                                    <div className="contentcheck">메뉴2 (1개)</div>
                                    <div className="contentcheck">메뉴3 (2개)</div>
                                </Stack>
                            </Stack>
                            <div style={{height: 10}}></div>
                            <div className="title">예약자 정보</div>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">이름</div>
                                <div className="contentcheck">원규진</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">전화번호</div>
                                <div className="contentcheck">010-1234-5678</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">요청사항</div>
                                <div className="contentcheck">-----</div>
                            </Stack>
                        </div>
                        <div style={{width: '500px', height: '400px', border: '1px solid #BFBFBF', borderRadius: '10px'}} />
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default ResvView;