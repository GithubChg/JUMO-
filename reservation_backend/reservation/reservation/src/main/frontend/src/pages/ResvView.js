import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";

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
                if(name==='원규진'&&password==='1234') {
                    alert('확인되었습니다. 예약을 조회합니다.')
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

    const date = '2022-11-27';
    const time = 5;
    const peopleCnt = 2;
    const menuCnt = [1,2,3,0,0,0,0,0,0,0];
    const price = 200000;
    const name = '원규진';
    const number = ['010', '1234', '5678']
    const password = '1234';
    const comment = '안녕하세요';

    // 변경 버튼 클릭
    const navigate = useNavigate();
    const onModify = () => {
        alert("예약 변경 페이지로 이동합니다.")
        navigate("/resvmodify", {state: {
            date: date,
            time: time,
            peopleCnt: peopleCnt,
            menuCnt: menuCnt,
            price: price,
            name: name,
            number: number,
            password: password,
            comment: comment,
        }});
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
                        <button onClick={onModify} className="btn" style={{padding: '6px 15px', marginBottom: '15px', borderRadius: '8px', textDecoration: 'none'}}>변경</button>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <div style={{minWidth: '500px'}}>
                            <div className="title">예약 정보</div>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">날짜 및 시간</div>
                                <div className="contentcheck">{date} {TimeList[time]}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">인원</div>
                                <div className="contentcheck">{peopleCnt} 명</div>
                            </Stack>
                            <Stack direction="row" alignItems="start" className="subcheck" mt={2}>
                                <div>
                                    <div className="subtitle">메뉴</div>
                                    <div style={{color: "#5B9BD5", fontSize: "12px", marginTop: '10px'}}>총 {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                                </div>
                                <Stack spacing={1}>
                                    {
                                        MenuList.map((item, idx) => (
                                            menuCnt[idx]>0 ?
                                            <div className="contentcheck">{item[0]} ({menuCnt[idx]}개)</div>
                                            : null
                                    ))}
                                </Stack>
                            </Stack>
                            <div style={{height: 10}}></div>
                            <div className="title">예약자 정보</div>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">이름</div>
                                <div className="contentcheck">{name}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">전화번호</div>
                                <div className="contentcheck">{number[0]+'-'+number[1]+'-'+number[2]}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">요청사항</div>
                                <div className="contentcheck">{comment}</div>
                            </Stack>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default ResvView;