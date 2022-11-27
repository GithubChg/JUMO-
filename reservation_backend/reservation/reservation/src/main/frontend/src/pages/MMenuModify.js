import React, {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import {MenuItem, FormControl, Select, Stack, TextField, Grid} from '@mui/material';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import MenuModal from '../components/MenuModal';
import "./css/styles.css";
import Logout from '../components/Logout';

function MMenuModify(props) {
    const location = useLocation();
    
    const _id = location.state.id;
    const _name = location.state.name;
    const _name1 = location.state.name1;
    const _price = location.state.price;
    const _people = location.state.people;


    console.log({
        id: _id,
        name: _name,
        name1: _name1,
        price: _price,
        people: _people,
    })

    // 예약 날짜 설정
  
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
                    <div className="guide">변경할 메뉴 정보를 입력하세요</div>
                    <div className="title">예약 정보</div>
                  
                   
             
            
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


export default MMenuModify;