import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import axios from 'axios';

function ResvViewContent(props) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState(0);
    const [peopleCnt, setPeopleCnt] = useState(0);
    const [menuCnt, setMenuCnt] = useState([]);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('원규진');
    const [number, setNumber] = useState(['', '', ''])
    const [password, setPassword] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        console.log({"id" : props.id})
        axios({
            url: "/api/readReservation",
            method: 'post',
            data: { phoneNumber: props.id },
            baseUrl: "http://localhost:8080"
        }).then((res) => {
            console.log("통신 성공")
            console.log({"res" : res.data.data})
            setDate(res.data.data.reservationDate.substr(0,10))
            setTime(TimeList.indexOf(res.data.data.reservationDate.substr(11)))
            setPeopleCnt(parseInt(res.data.data.numPeople))
            setPrice(parseInt(res.data.data.total))
            setName(res.data.data.userName)
            setNumber([res.data.data.phoneNumber.substr(0,3), res.data.data.phoneNumber.substr(3,4), res.data.data.phoneNumber.substr(7,4)])
            setPassword(res.data.data.password)

            const resvList = res.data.data.reserveMenu.split(",")
            console.log(resvList)
            const cnt = new Array(MenuList.length).fill(0)
            for(var i=0; i<MenuList.length; i++){
                for(var j=0; j<resvList.length; j++) {
                    if(MenuList[i][0]===resvList[j]) {
                        console.log(MenuList[i][0] , resvList[j])
                        cnt[i] += 1
                    }
                }
            }
            console.log(cnt)
            setMenuCnt(cnt)
            // setComment()
            console.log({
                date: date,
                time: time,
                peopleCnt: peopleCnt,
                menuCnt: menuCnt,
                price: price,
                name: name,
                number: number,
                password: password,
                comment: comment,
            })
        })
    }, [])

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

    return (
        <div>
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
                                            <div className="contentcheck" key={item}>{item[0]} ({menuCnt[idx]}개)</div>
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
        </div>
    );
}

export default ResvViewContent;