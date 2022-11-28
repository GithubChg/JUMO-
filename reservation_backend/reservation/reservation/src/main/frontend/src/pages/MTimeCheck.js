import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import {Stack} from '@mui/material';
import "./css/styles.css";
import Logout from '../components/Logout';

function MTimeCheck() {
    // 파라미터 받아오기
    const location = useLocation();

    const starttime = location.state.starttime;
    const startminute = location.state.startminute;
    const endtime = location.state.endtime;
    const endminute = location.state.endminute;

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
                    <div className="guide">운영 시간이 변경되었습니다!</div>
                    <Stack direction="row">
                        <div style={{minWidth: '500px'}}>
                            <div style={{height: 10}}></div>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">시작시간</div>
                                <div className="contentcheck">{starttime} : {startminute}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">종료시간</div>
                                <div className="contentcheck">{endtime} : {endminute}</div>
                            </Stack>
                     
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default MTimeCheck;