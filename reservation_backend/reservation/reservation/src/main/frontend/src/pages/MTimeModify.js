import React, {useState,useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import {MenuItem, FormControl, Select, Stack} from '@mui/material';
import "./css/styles.css";
import Logout from '../components/Logout';
import axios from 'axios';

function MTimeModify(props) {
    const navigate = useNavigate();

    const [starttime, setstarttime] = useState("");
    const starttimeList = [
        "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"
    ]

    const [startminute, setstartminute] = useState("");
    const startminuteList = ["00", "30"]

    const [endtime, setendtime] = useState("");
    const endtimeList = [
        "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"
    ]

    const [endminute, setendminute] = useState("");
    const endminuteList = ["00", "30"]

    useEffect(() => {
        axios({
            url: "/api/readRestaurant",
            method: 'post',
            baseUrl: "http://localhost:8080"
        }).then((res) => {
            setstarttime(res.data.data.startTime.substr(0,2))
            setstartminute(res.data.data.startTime.substr(3,2))
            setendtime(res.data.data.endTime.substr(0,2))
            setendminute(res.data.data.endTime.substr(3,2))
        })
    }, [])

    const inputStyle = {fontSize: '14px'};

    const onClickCreate = () => {
        axios({
            url: "/api/updateRestaurant",
            method: 'post',
            data: { startTime: starttime+":"+startminute, endTime: endtime+":"+endminute},
            baseUrl: "http://localhost:8080"
        }).then((res) => {
            alert("변경이 완료되었습니다.")
            navigate("/manager/mtimecheck", {state: {
                starttime: starttime,
                startminute: startminute,
                endtime: endtime,
                endminute: endminute,
            }});
        })
        
    };

    return (
        <>
            <Header isManager={true} />
            <div className="box">
                <Stack className="menu" justifyContent="space-between">
                    <div>
                        <div className="menuGroup">예약 관리</div>
                        <div className="menuBtn">
                            <Link to="/manager/resvview" className="menuLink">예약 조회/변경</Link>
                        </div>
                        <div className="menuBtn">
                            <Link to="/manager/resvstats" className="menuLink">예약 통계 조회</Link>
                        </div>
                        <div className="menuGroup">매장 관리</div>
                        <div className="menuBtn on">
                            <Link to="/manager/mtimemodify" className="menuLink">운영 시간 변경</Link>
                        </div>
                        <div className="menuBtn">
                            <Link to="/manager/mmenuview" className="menuLink">메뉴 조회/변경</Link>
                        </div>
                    </div>
                    <Logout />
                </Stack>
                <div className="content">
                    <div className="guide">운영 시간을 입력해주세요</div>
                    <Stack direction="row" alignItems="center" className="subcontent">
                    
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">시작 시간</div>

                        <FormControl sx={{ minHeight: 25, minWidth: 60 }}>
                            <Select
                                labelId="starttime-label"
                                id="starttime"
                                value={starttime}
                                label=""
                                autoWidth
                                onChange={(e) => setstarttime(e.target.value)}
                                size="small"
                                style={inputStyle}
                            >
                                {
                                    starttimeList.map((item, idx) => (
                                    <MenuItem value={item} key={idx+item} style={{fontSize: '14px'}}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{fontSize: '14px', margin: '0 15px 0 5px'}}>시</span>
                        <FormControl sx={{ minHeight: 25, minWidth: 60 }}>
                            <Select
                                labelId="startminute-label"
                                id="startminute"
                                value={startminute}
                                label=""
                                autoWidth
                                onChange={(e) => setstartminute(e.target.value)}
                                size="small"
                                style={inputStyle}
                            >
                                {
                                    startminuteList.map((item, idx) => (
                                    <MenuItem value={item} key={idx+item} style={{fontSize: '14px'}}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{fontSize: '14px', margin: '0 0 0 5px'}}>분</span>
                        </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">종료 시간</div>
                        <FormControl sx={{ minHeight: 25, minWidth: 60 }}>
                            <Select
                                labelId="endtime-label"
                                id="endtime"
                                value={endtime}
                                label=""
                                autoWidth
                                onChange={(e) => setendtime(e.target.value)}
                                size="small"
                                style={inputStyle}
                            >
                                {
                                    endtimeList.map((item) => (
                                    <MenuItem value={item} key={item} style={{fontSize: '14px'}}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{fontSize: '14px', margin: '0 15px 0 5px'}}>시</span>
                    
                        <FormControl sx={{ minHeight: 25, minWidth: 60 }}>
                            <Select
                                labelId="endminute-label"
                                id="endminute"
                                value={endminute}
                                label=""
                                autoWidth
                                onChange={(e) => setendminute(e.target.value)}
                                size="small"
                                style={inputStyle}
                            >
                                {
                                    endminuteList.map((item) => (
                                    <MenuItem value={item} key={item} style={{fontSize: '14px'}}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{fontSize: '14px', margin: '0 0 0 5px'}}>분</span>
                    </Stack>
                    <div style={{marginLeft: '45%', marginTop: '50px', marginBottom: '50px' }}>
                        <button className="btn" onClick={onClickCreate}>변경</button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default MTimeModify;