import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./css/styles.css";

function ResvModify(props) {
    const navigate = useNavigate();
    const [date, setDate] = useState('2022-11-17');
    // const today = new Date();
    const dateList = ["2022-11-16", "2022-11-17"];    
    
    const [time, setTime] = useState("10:00");
    const timeList = [
        "오전 10:00", "오전 11:00", "오후 12:00", "오후 1:00", "오후 2:00", "오후 3:00",
        "오후 4:00", "오후 5:00", "오후 6:00", "오후 7:00", "오후 8:00", "오후 9:00", 
    ]

    const [people, setPeople] = useState(3);
    const peopleList = [
        1, 2, 3, 4, 5, 6, 7, 8
    ]

    const inputStyle = {fontSize: '14px'};
    const menuList = [
        ["메뉴1", "20,000원"],
        ["메뉴2", "30,000원"],
        ["메뉴3", "40,000원"],
        ["메뉴4", "50,000원"],
        ["메뉴5", "60,000원"],
        ["메뉴1", "20,000원"],
        ["메뉴2", "30,000원"],
        ["메뉴3", "40,000원"],
        ["메뉴4", "50,000원"],
        ["메뉴5", "60,000원"],
    ]

    const onClickModify = () => {
        navigate("/resvcheck");
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
                        <div className="subtitle">날짜 및 시간</div>
                        <FormControl sx={{ minHeight: 30, maxWidth: 120 }}>
                            <Select
                                labelId="date-label"
                                id="date"
                                value={date}
                                label=""
                                autoWidth
                                onChange={(e) => setDate(e.target.value)}
                                size="small"
                                style={inputStyle}
                            >
                                {
                                    dateList.map((item, idx) => (
                                    <MenuItem value={item} key={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle" />
                        <Grid container rowSpacing={0.5} columnSpacing={0.5}>
                        {
                                timeList.map((item, idx) => (
                                idx===2 || idx===5 ? 
                                <Grid item>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input type="checkbox" key={item} disabled />
                                        <span key={item}>{item}</span>
                                    </label>
                                </Grid> :
                                idx===1 ?
                                <Grid item>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input type="checkbox" key={item} checked />
                                        <span key={item}>{item}</span>
                                    </label> 
                                </Grid> :
                                <Grid item>
                                    <label
                                        className="timeBtn"
                                    >
                                        <input type="checkbox" key={item} />
                                        <span key={item}>{item}</span>
                                    </label> 
                                </Grid>
                        ))}
                        </Grid>
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">인원</div>
                        <FormControl sx={{ minHeight: 25, minWidth: 60 }}>
                            <Select
                                labelId="people-label"
                                id="people"
                                value={people}
                                label=""
                                autoWidth
                                onChange={(e) => setPeople(e.target.value)}
                                size="small"
                                style={inputStyle}
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
                            <div className="subtitle">메뉴</div>
                            <div style={{color: "#5B9BD5", fontSize: "12px", marginTop: '10px'}}>총 68,000원</div>
                        </div>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                        {
                            menuList.map((item, idx) => (
                                <Grid item>
                                    <Stack key={item}>
                                        <span style={{fontSize: '14px', marginBottom: '5px'}}>{item[0]}</span>
                                        <span style={{fontSize: '12px', marginBottom: '10px'}}>{item[1]}</span>
                                        <div style={{width: '120px', height: '80px', border: '1px solid lightgray', borderRadius: '6px', marginBottom: '10px'}} />
                                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                                            <button style={{width: '22px', height: '22px', color: 'white', backgroundColor: '#5B9BD5', border: 'none', borderRadius: '20px'}}>-</button>
                                            <div style={{padding: '6px 14px', fontSize: '14px', border: '1px solid #BFBFBF', borderRadius: '5px'}}>1</div>
                                            <button style={{width: '22px', height: '22px', color: 'white', backgroundColor: '#5B9BD5', border: 'none', borderRadius: '20px'}}>+</button>
                                        </Stack>
                                    </Stack>
                                </Grid>
                        ))}
                        </Grid>
                    </Stack>
                    <div className="title" style={{marginTop: '50px'}}>예약자 정보</div>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">이름</div>
                        <TextField label="" variant="outlined" size="small" style={{width: '120px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="이름" value="원규진" />
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">전화번호</div>
                        <TextField label="" variant="outlined" size="small" style={{width: '70px'}} inputProps={{style: {fontSize: '14px', textAlign: 'center'}}} placeholder="010" value="010" />
                        <span style={{margin: '0 10px'}}>-</span>
                        <TextField label="" variant="outlined" size="small" style={{width: '70px'}} inputProps={{style: {fontSize: '14px', textAlign: 'center'}}} placeholder="1234" value="1234" />
                        <span style={{margin: '0 10px'}}>-</span>
                        <TextField label="" variant="outlined" size="small" style={{width: '70px'}} inputProps={{style: {fontSize: '14px', textAlign: 'center'}}} placeholder="5678" value="5678" />
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">비밀번호</div>
                        <TextField type="password" label="" variant="outlined" size="small" style={{width: '150px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="" value="12345" />
                    </Stack>
                    <Stack direction="row" alignItems="start" className="subcontent">
                        <div className="subtitle" style={{marginTop: '5px'}}>요청사항</div>
                        <TextField label="" multiline rows={4} size="small" style={{width: '600px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="요청사항을 적어주세요" value="없음" />
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