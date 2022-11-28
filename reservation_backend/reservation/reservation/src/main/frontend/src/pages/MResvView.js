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

    const columns = ['예약자명', '전화번호', '날짜/시간', '인원', '주문메뉴', '금액', '등록시간', '']
    const dataSet = [
        {
            id: 0,
            name: '원규진',
            number: '010-1234-5678',
            date: '2022-11-27',
            time: 2,
            people: 2,
            menu: [2,2,0,0,0,0,0,0,0,0],
            price: 80000,
            resvTime: '09:50:31',
        },
        {
            id: 1,
            name: '원규진',
            number: '010-5678-1234',
            date: '2022-11-27',
            time: 3,
            people: 2,
            menu: [2,2,0,0,0,0,0,0,0,0],
            price: 80000,
            resvTime: '09:50:31',
        },
        {
            id: 2,
            name: '원규진',
            number: '010-3333-2222',
            date: '2022-11-27',
            time: 4,
            people: 2,
            menu: [2,2,0,0,0,0,0,0,0,0],
            price: 80000,
            resvTime: '09:50:31',
        },
        {
            id: 3,
            name: '원규진',
            number: '010-1111-8888',
            date: '2022-11-27',
            time: 5,
            people: 2,
            menu: [2,2,0,0,0,0,0,0,0,0],
            price: 80000,
            resvTime: '09:50:31',
        },
        {
            id: 4,
            name: '원규진',
            number: '010-3214-7345',
            date: '2022-11-27',
            time: 5,
            people: 2,
            menu: [2,2,0,0,0,0,0,0,0,0],
            price: 80000,
            resvTime: '09:50:31',
        }
    ]
    const [data, setData] = useState(dataSet);

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
                            {data.map(({id, name, number, date, time, people, menu, price, resvTime}, idx) => (
                                <tr key={id}>
                                    <td width="80px">{name}</td>
                                    <td width="130px">{number}</td>
                                    <td width="200px">{date} ({TimeList[time]})</td>
                                    <td width="40px">{people}</td>
                                    <td width="200px">
                                    {
                                        MenuList.map((item, idx) => (
                                            menu[idx]>0 ?
                                            <span>{item[0]}({menu[idx]}개) </span>
                                            : null
                                    ))}
                                    </td>
                                    <td width="80px">{price}</td>
                                    <td width="80px">{resvTime}</td>
                                    <td width="50px">
                                        <Stack direction="row">
                                            <IconButton onClick={() => {
                                                if(window.confirm("예약을 변경하시겠습니까?")) {
                                                    alert("예약 변경 페이지로 이동합니다.")
                                                    navigate("/manager/resvmodify", {state: {
                                                        date: data[idx].date,
                                                        time: data[idx].time,
                                                        people: data[idx].people,
                                                        menu: data[idx].menu,
                                                        price: data[idx].price,
                                                    }})
                                                }
                                            }}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                if(window.confirm("예약을 정말 삭제하시겠습니까?")) {
                                                    alert("예약이 삭제되었습니다.")
                                                    const newData = data.filter((d) => d.id !== id);
                                                    setData(newData);
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