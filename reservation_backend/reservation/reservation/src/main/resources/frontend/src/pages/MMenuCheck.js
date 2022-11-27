import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Header from '../components/Header';
import "./css/styles.css";
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import { People } from '@mui/icons-material';

function MMenuCheck() {
    // 파라미터 받아오기
    const location = useLocation();

    const _id = location.state.id;
    const _name = location.state.name;
    const _name1 = location.state.name1;
    const _price = location.state.price;
    const _people = location.state.people;

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
                    <div className="guide">메뉴 정보가 변경되었습니다!</div>
                    <Stack direction="row">
                        <div style={{minWidth: '500px'}}>

                            
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">이름</div>
                                <div className="contentcheck">{name}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">설명</div>
                                <div className="contentcheck">{name1}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">가격</div>
                                <div className="contentcheck">{price}</div>
                            </Stack>
                            <Stack direction="row" alignItems="center" className="subcheck">
                                <div className="subtitle">재고</div>
                                <div className="contentcheck">{People}</div>
                            </Stack>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    );
}

export default MMenuCheck;