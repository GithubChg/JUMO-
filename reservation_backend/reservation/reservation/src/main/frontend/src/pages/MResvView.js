import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TimeList from "../data/TimeList.js";
import MenuList from "../data/MenuList.js";
import "./css/styles.css";
import Logout from '../components/Logout';
import axios from 'axios';

function MResvView(props) {
    const navigate = useNavigate();
    const [reservationList, setReservationList] = useState([]);

    const columns = ['예약자명', '전화번호', '날짜/시간', '인원', '주문메뉴', '금액', '']
    axios({
        url: "/api/readReservationList",
        method: 'post',
        baseUrl: "http://localhost:8080"
    }).then((res) => {
        console.log("통신 성공")
        const data = res.data.reservationList
        console.log({"data": data})
        const ls = []
        for(var i=0; i<data.length; i++){
            const resvList = data[i].reserveMenu.split(",")
            const cnt = new Array(MenuList.length).fill(0)
            for(var k=0; k<MenuList.length; k++){
                for(var j=0; j<resvList.length; j++) {
                    if(MenuList[k][0]===resvList[j]) {
                        cnt[k] += 1
                    }
                }
            }
            console.log(cnt)
            
            ls.push({
                name: data[i].userName,
                number: data[i].phoneNumber,
                date: data[i].reservationDate.substr(0,10),
                time: TimeList.indexOf(data[i].reservationDate.substr(11)),
                people: data[i].numPeople,
                menu: cnt,
                price: data[i].total,

        });}
        console.log(ls)
        setReservationList(ls)
        console.log({"ReservationList": reservationList})
    }, [])


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
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {reservationList.map((item, idx) => (
                                <tr key={item.name+item.number}>
                                    <td width="80px">{item.name}</td>
                                    <td width="130px">{item.number.substr(0,3)+"-"+item.number.substr(3,4)+"-"+item.number.substr(7,4)}</td>
                                    <td width="200px">{item.date} ({TimeList[item.time]})</td>
                                    <td width="40px">{item.people}</td>
                                    <td width="300px">
                                    {
                                        MenuList.map((m, idx) => (
                                            item.menu[idx]>0 ?
                                            <span>{m[0]}({item.menu[idx]}개) </span>
                                            : null
                                        ))
                                    }
                                    </td>
                                    <td width="80px">{item.price}</td>
                                    <td width="50px">
                                        <Stack direction="row">
                                            <IconButton onClick={() => {
                                                if(window.confirm("예약을 변경하시겠습니까?")) {
                                                    alert("예약 변경 페이지로 이동합니다.")
                                                    navigate("/manager/resvmodify", {state: {
                                                        date: reservationList[idx].date,
                                                        time: reservationList[idx].time,
                                                        people: reservationList[idx].people,
                                                        menu: reservationList[idx].menu,
                                                        price: reservationList[idx].price,
                                                    }})
                                                }
                                            }}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                if(window.confirm("예약을 정말 삭제하시겠습니까?")) {
                                                    alert("예약이 삭제되었습니다.")
                                                    const newData = reservationList.filter((d) => d.number !== item.number);
                                                    // setData(newData);
                                                }
                                            }}>
                                                <DeleteForeverIcon color="error" />
                                            </IconButton>
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MResvView;