import React, {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import MenuModal from '../components/MenuModal';
import "./css/styles.css";
import axios from 'axios';
import ReservedTime from '../data/ReservedTime';

// 지난 예약은 조회가 불가능하게, 혹은 변경이 불가능하게 설정

function ResvModify(props) {
    // 파라미터 받아오기
    const location = useLocation();

    const _date = location.state.date;
    const _time = location.state.time;
    const _peopleCnt = location.state.peopleCnt;
    const _menuCnt = location.state.menuCnt;
    const _price = location.state.price;
    const _name = location.state.name;
    const _number = location.state.number;
    const _password = location.state.password;
    const _comment = location.state.comment;

    // 예약 날짜 설정
    const dateNow = new Date();
    const today = dateNow.getFullYear()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getDate();
    const [date, setDate] = useState(_date);
    const endDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate()+7).toISOString().slice(0, 10);
    
    // 예약 시간 설정
    const selected = new Date(date.slice(0,4), date.slice(5,7), date.slice(8,10));
    const now = new Date(today.slice(0,4), today.slice(5,7), today.slice(8,10));
    const diff =  selected.getTime() - now.getTime();

    const [time, setTime] = useState(_time);

    // 예약 인원 설정
    const [peopleCnt, setPeopleCnt] = useState(_peopleCnt);
    const peopleList = [
        1, 2, 3, 4, 5, 6, 7, 8
    ];

    // 예약 메뉴, 총 가격 설정
    const [menuCnt, setMenuCnt] = useState(_menuCnt);
    const [price, setPrice] = useState(_price);

    // 예약자 정보 설정
    const [name, setName] = useState(_name);
    const [number, setNumber] = useState(_number);
    const [password, setPassword] = useState(_password);
    const [comment, setComment] = useState(_comment);

    // 필수값 설정
    const [emptyTime, setEmptyTime] = useState(false);
    const [emptyPrice, setEmptyPrice] = useState(false);
    const [emptyName, setEmptyName] = useState(false);
    const [emptyNumber, setEmptyNumber] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);

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

    const result = {};
            result["reservationDate"] = date+" "+TimeList[time];
            result["numPeople"] = peopleCnt;
            result["total"] = price
            result["userName"] = name
            result["phoneNumber"] = number[0]+number[1]+number[2]
            result["password"] = password
            result["comment"] = comment

            var menuList = ""
            for (var i=0; i<menuCnt.length; i++) {
                for (var j=0; j<menuCnt[i]; j++) {
                    menuList += MenuList[i][0]+","
                }
            }
            result["reserveMenu"] = menuList.slice(0,menuList.length-1)

        if (time===-1||price===0||name===''||number[0]===''||number[1]===''||number[2]===''||password==='') {
            if(time===-1) { setEmptyTime(true) } 
            else { setEmptyTime(false) }
            if(price===0) { setEmptyPrice(true) } 
            else { setEmptyPrice(false) }
            if(name==='') { setEmptyName(true) } 
            else { setEmptyName(false) }
            if(number[0]===''||number[1]===''||number[2]==='') { setEmptyNumber(true) } 
            else { setEmptyNumber(false) }
            if(password==='') { setEmptyPassword(true) } 
            else { setEmptyPassword(false) }
        } else {
             console.log(result);
                        axios({
                            url: "/api/updateReservation",
                            method: 'post',
                            data: result,
                            baseUrl: "http://localhost:8080"
                        }).then((res) => {
                            console.log(res)
                        })
                        // 예약 확인 페이지로
                        alert("예약이 변경되었습니다!")
                        navigate("/resvcheck", {state: {
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
            <Header />
            <div className="box">
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
                                <Grid item key={item+idx}>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={true}
                                            name="time"
                                            onChange={(e) => {
                                                onTimeChange(e.target);
                                                setTime(idx);
                                            }}
                                        />
                                        <span>{TimeList[idx]}</span>
                                    </label> 
                                </Grid> :
                                ReservedTime[diff/(1000 * 60 * 60 * 24)][idx]===0 ?
                                <Grid item key={item+idx}>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input 
                                            type="checkbox" 
                                            name="time"
                                            onChange={(e) => {
                                                onTimeChange(e.target);
                                                setTime(idx);
                                            }}
                                        />
                                        <span>{TimeList[idx]}</span>
                                    </label> 
                                </Grid> :
                                <Grid item key={item+idx}>
                                <label
                                    className="timeBtn"
                                >
                                    <input type="checkbox" name="time" disabled />
                                    <span>{TimeList[idx]}</span>
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
                                <Grid item key={item+idx}>
                                    <Stack>
                                        <span style={{fontSize: '14px', marginBottom: '5px'}}>{item[0]}</span>
                                        <span style={{fontSize: '12px', marginBottom: '10px'}}>{item[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                        <div style={{width: '120px', height: '85px', backgroundColor: 'transparent'}} />
                                        <img className="menuImage" src={`img/img${idx+1}.jpg`} alt="메뉴 이미지" title="자세히보기" />
                                        <MenuModal name={MenuList[idx][0]} price={MenuList[idx][1]} detail={MenuList[idx][2]} src={`img/img${idx+1}.jpg`} allergy={MenuList[idx][4]} />
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
                    <div className="title" style={{marginTop: '50px'}}>예약자 정보</div>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">이름<span style={{fontSize:'14px', color:'red'}}> *</span></div>
                        <TextField 
                            label="" 
                            variant="outlined" 
                            size="small" 
                            style={{width: '120px'}} 
                            inputProps={{style: {fontSize: '14px'}}} 
                            value={name}
                            onChange={(e) => {
                                if(e.target.value.length <= 10) {
                                    setName(e.target.value)
                                }
                            }}
                            placeholder="이름" />
                    </Stack>
                    {emptyName ? <span className="error">*이름을 입력하세요</span> : null}
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">전화번호<span style={{fontSize:'14px', color:'red'}}> *</span></div>
                        <TextField 
                            label="" 
                            variant="outlined" 
                            size="small" 
                            style={{width: '70px'}} 
                            inputProps={{style: {fontSize: '14px', textAlign: 'center'}}} 
                            value={number[0]}
                            onChange={(e) => {
                                if(e.target.value.length <= 3) {
                                    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                                    setNumber([onlyNumber, number[1], number[2]]);
                                }
                            }}
                            placeholder="010" />
                        <span style={{margin: '0 10px'}}>-</span>
                        <TextField 
                            label="" 
                            variant="outlined" 
                            size="small" 
                            style={{width: '70px'}} 
                            inputProps={{style: {fontSize: '14px', textAlign: 'center'}}} 
                            value={number[1]}
                            onChange={(e) => {
                                if(e.target.value.length <= 4) {
                                    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                                    setNumber([number[0],onlyNumber,number[2]]);
                                }
                            }}
                            placeholder="1234" />
                        <span style={{margin: '0 10px'}}>-</span>
                        <TextField 
                            label="" 
                            variant="outlined" 
                            size="small" 
                            style={{width: '70px'}} 
                            inputProps={{style: {fontSize: '14px', textAlign: 'center'}}} 
                            value={number[2]}
                            onChange={(e) => {
                                if(e.target.value.length <= 4) {
                                    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
                                    setNumber([number[0],number[1],onlyNumber]);
                                }
                            }}
                            placeholder="5678" />
                    </Stack>
                    {emptyNumber ? <span className="error">*전화번호를 입력하세요</span> : null}
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">비밀번호<span style={{fontSize:'14px', color:'red'}}> *</span></div>
                        <TextField 
                            type="password" 
                            label="" 
                            variant="outlined" 
                            size="small" 
                            style={{width: '150px'}} 
                            inputProps={{style: {fontSize: '14px'}}} 
                            value={password}
                            onChange={(e) => {
                                if(e.target.value.length <= 10) {
                                    setPassword(e.target.value)
                                }
                            }}
                            placeholder="" />
                    </Stack>
                    {emptyPassword ? <span className="error">*비밀번호를 선택하세요</span> : null}
                    <Stack direction="row" alignItems="start" className="subcontent">
                        <div className="subtitle" style={{marginTop: '5px'}}>요청사항</div>
                        <TextField 
                            label="" 
                            multiline 
                            rows={4} 
                            size="small" 
                            style={{width: '600px'}} 
                            inputProps={{style: {fontSize: '14px'}}} 
                            value={comment}
                            onChange={(e) => {
                                if(e.target.value.length <= 200) {
                                    setComment(e.target.value)
                                }
                            }}
                            placeholder="요청사항을 적어주세요" />
                    </Stack>
                    <div style={{marginLeft: '45%', marginTop: '50px', marginBottom: '50px'}}>
                        <button className="btn" onClick={onClickModify}>변경</button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ResvModify;