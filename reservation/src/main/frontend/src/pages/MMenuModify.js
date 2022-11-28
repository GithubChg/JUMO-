import React, {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import {MenuItem, FormControl, Select, Stack, TextField, Grid} from '@mui/material';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import "./css/styles.css";
import Logout from '../components/Logout';

function MMenuModify() {
    const navigate = useNavigate();

    const location = useLocation();
    
    const _name = location.state.name;
    const _menu = location.state.menu;
    const _name1 = location.state.name1;
    const _price = location.state.price;
    const _people = location.state.people;
    const _peopleCnt = location.state.people;

    console.log({
        peopleCnt: _peopleCnt,
    })

    const [name, setName] = useState(_name);
    const [menu, setMenu] = useState(_menu);
    const [name1, setName1] = useState(_name1);
    const [price, setPrice] = useState(_price);
    const [people, setpeople] = useState(_people);

    const [peopleCnt, setPeopleCnt] = useState(_peopleCnt);
    const peopleList = [
        1, 2, 3, 4, 5, 6, 7, 8
    ];


    const onClickCreate = () => {
        navigate("/manager/mmenucheck", {state: {
            menu: menu,
            name: name,
            name1: name1,
            price: price,
            people:people,
        }});
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
                        <div className="menuBtn">
                            <Link to="/manager/mtimemodify" className="menuLink">운영 시간 변경</Link>
                        </div>
                        <div className="menuBtn on">
                            <Link to="/manager/mmenuview" className="menuLink">메뉴 조회/변경</Link>
                        </div>
                    </div>
                    <Logout />
                </Stack>

                    
                <div className="content">
                    <div className="guide">변경할 예약 정보를 입력하세요</div>
    <Stack direction="row" alignItems="center" className="subcontent">
        <div className="subtitle">이름<span style={{fontSize:'14px', color:'red'}}> </span></div>
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
         />
</Stack>

<Stack direction="row" alignItems="start" className="subcontent">
    <div className="subtitle" style={{marginTop: '5px'}}>설명</div>
    <TextField 
        label="" 
        multiline 
        rows={4} 
        size="small" 
        style={{width: '600px'}} 
        inputProps={{style: {fontSize: '14px'}}} 
        value={name1}
        onChange={(e) => {
            if(e.target.value.length <= 200) {
                setName1(e.target.value)
            }
        }}
        placeholder="요청사항을 적어주세요" />
</Stack>


<Stack direction="row" alignItems="center" className="subcontent">
    <div className="subtitle">가격<span style={{fontSize:'14px', color:'red'}}> </span></div>
    <TextField 
        label="" 
        variant="outlined" 
        size="small" 
        style={{width: '150px'}} 
        inputProps={{style: {fontSize: '14px'}}} 
        value={price}
        onChange={(e) => {
            if(e.target.value.length <= 10) {
                setPrice(e.target.value)
            }
        }}
        placeholder="" />
          <span style={{fontSize: '14px', margin: '0 0 0 5px'}}>원</span>
</Stack>


<Stack direction="row" alignItems="center" className="subcontent">
                        <div className="subtitle">재고<span style={{fontSize:'14px', color:'red'}}> </span></div>
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
                        <span style={{fontSize: '14px', margin: '0 0 0 5px'}}>개</span>
                    </Stack>


                    <div style={{marginLeft: '45%', marginTop: '50px', marginBottom: '50px' }}>
                        <button className="btn" onClick={onClickCreate}>변경</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MMenuModify;