import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import "./css/styles.css";

function ResvCheck() {
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
                    <div className="menuBtn on">
                        <Link to="/resvcheck" className="menuLink">
                            예약 조회/변경
                        </Link>
                    </div>
                    <div className="menuBtn">
                        <Link to="/" className="menuLink">
                            예약 취소
                        </Link>
                    </div>
                </div>
                <div className="content">
                    <div className="guide">등록할 예약 정보를 입력하세요</div>
                    <div className="title">예약 정보</div>
                    <div className="subcontent">
                        <div className="subtitle">날짜 및 시간</div>
                    </div>
                    <div className="subcontent">
                        <div className="subtitle">인원</div>
                        <div>dd</div>
                    </div>
                    <div className="subcontent">
                        <div>
                            <div className="subtitle">메뉴</div>
                            <div style={{color: "#5B9BD5", fontSize: "12px"}}>총 68,000원</div>
                        </div>
                        <div>dd</div>
                    </div>
                    <div style={{height: 10}}></div>
                    <div className="title">예약자 정보</div>
                    <div className="subcontent">
                        <div className="subtitle">이름</div>
                        <div>dd</div>
                    </div>
                    <div className="subcontent">
                        <div className="subtitle">전화번호</div>
                        <div>dd</div>
                    </div>
                    <div className="subcontent">
                        <div className="subtitle">비밀번호</div>
                        <div>dd</div>
                    </div>
                    <div className="subcontent">
                        <div className="subtitle">요청사항</div>
                        <div>dd</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResvCheck;