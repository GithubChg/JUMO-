import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {Stack, Grid} from '@mui/material';
import "./css/styles.css";
import MenuPieChart from '../components/MenuPieChart';
import SalesLineChart from '../components/SalesLineChart';
import Logout from '../components/Logout';

function MResvStats(props) {
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
                        <div className="menuBtn on">
                            <Link to="/manager/resvstats" className="menuLink">예약 통계 조회</Link>
                        </div>
                        <div className="menuGroup">매장 관리</div>
                        <div className="menuBtn">
                            <Link to="/manager/resvview" className="menuLink">운영 시간 변경</Link>
                        </div>
                        <div className="menuBtn">
                            <Link to="/manager/resvview" className="menuLink">메뉴 조회/변경</Link>
                        </div>
                    </div>
                    <Logout />
                </Stack>
                <div className="content">
                    <Grid container>
                        <Grid item xs={6} style={{height: '550px'}}>
                            <div className="guide" style={{color:'black'}}>메뉴별 점유율</div>
                            <MenuPieChart />
                        </Grid>
                        <Grid item xs={6} style={{height: '550px'}}>
                            <div className="guide" style={{color:'black'}}>누적 예약 금액</div>
                            <SalesLineChart />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default MResvStats;