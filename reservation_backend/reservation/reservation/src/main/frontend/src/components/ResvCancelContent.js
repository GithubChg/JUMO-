import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

function ResvCancelContent(props) {
    useEffect(() => {
        console.log({"id" : props.id})
        axios({
            url: "/api/deleteReservation",
            method: 'post',
            data: { phoneNumber: props.id },
            baseUrl: "http://localhost:8080"
        }).then((res) => {
            console.log("통신 성공")
            console.log({"res" : res.data})
        })
    }, [])

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

    return (
        <div>
            <Header />
            <div className="box">
                <Menu />
                <div className="content">
                    <div className="guide">예약이 취소되었습니다 :(</div>
                </div>
            </div>
        </div>
    );
}

export default ResvCancelContent;