import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import "./css/styles.css";
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";

function ResvCheck() {
    // 파라미터 받아오기
    const location = useLocation();

    const date = location.state.date;
    const time = location.state.time;
    const peopleCnt = location.state.peopleCnt;
    const menuCnt = location.state.menuCnt;
    const price = location.state.price;
    const name = location.state.name;
    const number = location.state.number;
    const comment = location.state.comment;

    return (
        <>
            <Header />
            <div className="box">
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
                    <div className="menuBtn">
                        <Link to="/resvcancel" className="menuLink">
                            예약 취소
                        </Link>
                    </div>
                </div>
                <div className="content">
                    <div className="guide">예약이 완료되었습니다!</div>
                    <Stack direction="row">
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
                                            <div className="contentcheck" key={item+idx}>{item[0]} ({menuCnt[idx]}개)</div>
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

export default ResvCheck;