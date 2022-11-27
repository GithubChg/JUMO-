import React, {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import {MenuItem, FormControl, Select, Stack, TextField, Grid} from '@mui/material';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import MenuModal from '../components/MenuModal';
import "./css/styles.css";
import Logout from '../components/Logout';

function MResvModify(props) {
    // 파라미터 받아오기
    const location = useLocation();
    
    const _date = location.state.date;
    const _time = location.state.time;
    const _peopleCnt = location.state.people;
    const _menuCnt = location.state.menu;
    const _price = location.state.price;
    console.log({
        date: _date,
        time: _time,
        peopleCnt: _peopleCnt,
        menuCnt: _menuCnt,
        price: _price,
    })

    // 예약 날짜 설정
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);
    const [date, setDate] = useState(_date);
    const endDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()+7).toISOString().slice(0, 10);
    
    // 예약 시간 설정
    const selected = new Date(date.slice(0,4), date.slice(5,7), date.slice(8,10));
    const now = new Date(today.slice(0,4), today.slice(5,7), today.slice(8,10));
    const diff =  selected.getTime() - now.getTime();

    const t = [
        [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const [time, setTime] = useState(_time);

    // 예약 인원 설정
    const [peopleCnt, setPeopleCnt] = useState(_peopleCnt);
    const peopleList = [
        1, 2, 3, 4, 5, 6, 7, 8
    ];

    // 예약 메뉴, 총 가격 설정
    const [menuCnt, setMenuCnt] = useState(_menuCnt);
    const [price, setPrice] = useState(_price);

    // 필수값 설정
    const [emptyTime, setEmptyTime] = useState(false);
    const [emptyPrice, setEmptyPrice] = useState(false);

    // 최종 데이터
    // const [data, setData] = useState({
    //     date: date,
    //     time: time,
    //     peopleCnt: peopleCnt,
    //     menuCnt: menuCnt,
    //     price: price,
    //     name: name,
    //     number: number,
    //     password: password,
    //     comment: comment,
    // });

    // 등록 버튼 클릭, 데이터 저장하고 파라미터 보내기
    const navigate = useNavigate();
    const onClickModify = () => {
        if (time===-1||price===0) {
            if(time===-1) { setEmptyTime(true) } 
            else { setEmptyTime(false) }
            if(price===0) { setEmptyPrice(true) } 
            else { setEmptyPrice(false) }
        } else {
            // setData({
            //     date: date,
            //     time: time,
            //     peopleCnt: peopleCnt,
            //     menuCnt: menuCnt,
            //     price: price,
            //     name: name,
            //     number: number,
            //     password: password,
            //     comment: comment,
            // });
            alert("예약이 변경되었습니다! 예약 조회 화면으로 돌아갑니다.")
            navigate("/manager/resvview");
        }
    };

    // 시간 체크박스 클릭
    const onTimeChange = (checked) => {
        const boxes = document.getElementsByName("time");
        for(var i=0; i<boxes.length; i++) {
            if(boxes[i] !== checked) {
                boxes[i].checked = false;
            }
        }
    };

    return (
        <>
            <Header isManager={true} />
            <div className="box">
                <Stack className="menu" justifyContent="space-between">
                    <div>
                        <div className="menuGroup">예약 관리</div>
                        <div className="menuBtn on">
                            <Link to="/manager/resvview" className="menuLink">예약 조회/변경</Link>
                        </div>
                        <div className="menuBtn">
                            <Link to="/manager/resvstats" className="menuLink">예약 통계 조회</Link>
                        </div>
                        <div className="menuGroup">매장 관리</div>
                        <div className="menuBtn">
                            <Link to="/manager/mtimemodify" className="menuLink">운영 시간 변경</Link>
                        </div>
                        <div className="menuBtn">
                            <Link to="/manager/mmenuview" className="menuLink">메뉴 조회/변경</Link>
                        </div>
                    </div>
                    <Logout />
                </Stack>

                <div className="content">
                    <div className="guide">변경할 예약 정보를 입력하세요</div>
                    <div className="title">예약 정보</div>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">날짜 및 시간<span style={{fontSize:'14px', color:'red'}}> *</span></div>
                        <TextField
                            id="date"
                            label=""
                            type="date"
                            defaultValue={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                                const boxes = document.getElementsByName("time");
                                for(var i=0; i<boxes.length; i++) {
                                        boxes[i].checked = false;
                                }
                            }}
                            inputProps={{min: today, max: endDate}}
                            inputlabelprops={{shrink: true}}
                            size="small"
                        />
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle" />
                        <Grid container rowSpacing={0.5} columnSpacing={0.5}>
                        {
                                TimeList.map((item, idx) => (
                                idx===time ?
                                <Grid item key={idx}>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={true}
                                            name="time"
                                            key={idx} 
                                            onChange={(e) => {
                                                onTimeChange(e.target);
                                                setTime(idx);
                                            }}
                                        />
                                        <span key={idx}>{TimeList[idx]}</span>
                                    </label> 
                                </Grid> :
                                t[diff/(1000 * 60 * 60 * 24)][idx]===0 ?
                                <Grid item key={idx}>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input 
                                            type="checkbox" 
                                            name="time"
                                            key={idx} 
                                            onChange={(e) => {
                                                onTimeChange(e.target);
                                                setTime(idx);
                                            }}
                                        />
                                        <span key={idx}>{TimeList[idx]}</span>
                                    </label> 
                                </Grid> :
                                <Grid item key={idx}>
                                <label
                                    className="timeBtn"
                                >
                                    <input type="checkbox" name="time" key={idx} disabled />
                                    <span key={idx}>{TimeList[idx]}</span>
                                </label> 
                            </Grid>
                        ))}
                        </Grid>
                    </Stack>
                    {emptyTime ? <span className="error">*시간을 선택하세요</span> : null}
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">인원<span style={{fontSize:'14px', color:'red'}}> *</span></div>
                        <FormControl sx={{ minHeight: 25, minWidth: 60 }}>
                            <Select
                                labelId="peopleCnt-label"
                                id="peopleCnt"
                                value={peopleCnt}
                                label=""
                                autoWidth
                                onChange={(e) => setPeopleCnt(e.target.value)}
                                size="small"
                                style={{fontSize: '14px'}}
                            >
                                {
                                    peopleList.map((item) => (
                                    <MenuItem value={item} key={item} style={{fontSize: '14px'}}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{fontSize: '14px', margin: '0 0 0 5px'}}>명</span>
                    </Stack>
                    <Stack direction="row" alignItems="start" className="subcontent" mt={2}>
                        <div>
                            <div className="subtitle">메뉴<span style={{fontSize:'14px', color:'red'}}> *</span></div>
                            <div style={{color: "#5B9BD5", fontSize: "12px", marginTop: '10px'}}>총 {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</div>
                            <button 
                                style={{marginTop: '10px', backgroundColor: 'white', fontSize: '12px', border: '1px solid #BFBFBF', borderRadius: '5px'}} 
                                onClick={() => {
                                    setMenuCnt(Array(MenuList.length).fill(0));
                                    setPrice(0);
                                }}>초기화</button>
                        </div>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                        {
                            MenuList.map((item, idx) => (
                                <Grid item key={idx}>
                                    <Stack>
                                        <span style={{fontSize: '14px', marginBottom: '5px'}}>{item[0]}</span>
                                        <span style={{fontSize: '12px', marginBottom: '10px'}}>{item[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                        <div style={{width: '120px', height: '85px', backgroundColor: 'transparent'}} />
                                        <img className="menuImage" src={`/img/img${idx+1}.jpg`} alt={`메뉴 이미지${idx+1}`} title="자세히보기" />
                                        <MenuModal name={MenuList[idx][0]} price={MenuList[idx][1]} detail={MenuList[idx][2]} src={`/img/img${idx+1}.jpg`} />
                                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                            <button 
                                                name="menu"
                                                style={{width: '22px', height: '22px', color: 'white', backgroundColor: '#5B9BD5', border: 'none', borderRadius: '20px', cursor: 'pointer'}}
                                                onClick={() => {
                                                    setMenuCnt(menuCnt.map(
                                                        (cnt, i) => (i===idx)&&(cnt!==0) ? cnt-1 : cnt
                                                    ))
                                                    setPrice(price-MenuList[idx][1])
                                                }}
                                            >-</button>
                                            <div style={{padding: '6px 14px', fontSize: '14px', border: '1px solid #BFBFBF', borderRadius: '5px'}}>{menuCnt[idx]}</div>
                                            <button 
                                                name="menu"
                                                style={{width: '22px', height: '22px', color: 'white', backgroundColor: '#5B9BD5', border: 'none', borderRadius: '20px', cursor: 'pointer'}}
                                                onClick={() => {
                                                    setMenuCnt(menuCnt.map(
                                                        (cnt, i) => (i===idx)&&(cnt!==5) ? cnt+1 : cnt
                                                    ))
                                                    setPrice(price+MenuList[idx][1])
                                                }}
                                            >+</button>
                                        </Stack>
                                    </Stack>
                                </Grid>
                        ))}
                        </Grid>
                    </Stack>
                    {emptyPrice ? <span className="error">*메뉴를 선택하세요</span> : null}
                    <div style={{marginLeft: '45%', marginTop: '50px', marginBottom: '50px'}}>
                        <button className="btn" onClick={onClickModify}>변경</button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default MResvModify;