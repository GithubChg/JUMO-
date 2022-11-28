import React, {useState} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import {MenuItem, FormControl, Select, Stack, TextField} from '@mui/material';
import "./css/styles.css";
import Logout from '../components/Logout';
import axios from 'axios';

function MMenuModify() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const _name = location.state.name;
    const _detail = location.state.detail;
    const _allergy = location.state.allergy;
    const _price = location.state.price;
    const _stock = location.state.stock;

    const [name, setName] = useState(_name);
    const [detail, setDetail] = useState(_detail);
    const [allergy, setAllergy] = useState(_allergy);
    const [price, setPrice] = useState(_price);
    const [stock, setStock] = useState(_stock);

    const stockList = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ];

        const oldMenuName = 
    const onClickModify = () => {

        const result = {};
        result["menuName"] = name;
        result["description"] = detail;
        result["allergy"] = allergy;
        result["price"] = price;
        result["stock"] = stock;

        axios({
        url: "/api/updateMenu",
        method: 'post',
        data: result,
        baseUrl: "http://localhost:8080"
        }).then((res) => {
            console.log(res)
            console.log("통신 성공")
            alert("메뉴가 변경 되었습니다! 메뉴 조회 화면으로 돌아갑니다.")
             navigate("/manager/mmenuview");
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
                            style={{width: '200px'}} 
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
                        <div className="subtitle" style={{marginTop: '5px'}}>메뉴 설명</div>
                        <TextField 
                            label="" 
                            multiline 
                            rows={4} 
                            size="small" 
                            style={{width: '600px'}} 
                            inputProps={{style: {fontSize: '14px'}}} 
                            value={detail}
                            onChange={(e) => {
                                if(e.target.value.length <= 200) {
                                    setDetail(e.target.value)
                                }
                            }}
                            placeholder="설명을 적어주세요" />
                    </Stack>
                    <Stack direction="row" alignItems="start" className="subcontent">
                        <div className="subtitle" style={{marginTop: '5px'}}>알러지 정보</div>
                        <TextField 
                            label="" 
                            multiline 
                            rows={4} 
                            size="small" 
                            style={{width: '600px'}} 
                            inputProps={{style: {fontSize: '14px'}}} 
                            value={allergy}
                            onChange={(e) => {
                                if(e.target.value.length <= 200) {
                                    setAllergy(e.target.value)
                                }
                            }}
                            placeholder="알러지 정보를적어주세요" />
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
                                value={stock}
                                label=""
                                autoWidth
                                onChange={(e) => setStock(e.target.value)}
                                size="small"
                                style={{fontSize: '14px'}}
                            >
                                {
                                    stockList.map((item) => (
                                    <MenuItem value={item} key={item} style={{fontSize: '14px'}}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <span style={{fontSize: '14px', margin: '0 0 0 5px'}}>개</span>
                    </Stack>
                    <div style={{marginLeft: '45%', marginTop: '50px', marginBottom: '50px' }}>
                        <button className="btn" onClick={onClickModify}>변경</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MMenuModify;