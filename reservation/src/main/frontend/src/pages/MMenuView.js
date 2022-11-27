import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./css/styles.css";
import { Image } from '@mui/icons-material';
import Logout from '../components/Logout';

function MMenuView(props) {
    const navigate = useNavigate();

    const columns = ['이름', '설명', '금액', '재고', '']
    const dataSet = [
        {
            id: 0,
            name: '메뉴 1',
            name1: '메뉴 1에 대한 설명',
            price: 80000,
            people: 2,
        },
        {
            id: 1,
            name: '메뉴 2',
            name1: '메뉴 2에 대한 설명',
            price: 70000,
            people: 3,
          
        },
        {
            id: 2,
            name: '메뉴 3',
            name1: '메뉴 3에 대한 설명',
            price: 65000,
            people: 4,
            
        },
        {
            id: 3,
            name: '메뉴 4',
            name1: '메뉴 4에 대한 설명',
            price: 80000,
            people: 2,
           
        },
      
    ]
    const [data, setData] = useState(dataSet);

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
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(({id, name, name1, price, people,}, idx) => (
                                <tr key={id}>
                                    <td width="80px">{name}</td>
                                    <td width="200px">{name1}</td>
                                    <td width="80px">{price}</td>
                                    <td width="40px">{people}</td>
                                   

                                    <td width="50px">
                                        <Stack direction="row">
                                            <IconButton onClick={() => {
                                                if(window.confirm("메뉴를 변경하시겠습니까?")) {
                                                    alert("메뉴 변경 페이지로 이동합니다.")
                                                    navigate("/manager/mmenumodify", {state: {
                                                        name: data[idx].name,
                                                        name1: data[idx].name1,
                                                        price: data[idx].price,
                                                        people: data[idx].people,
                                                    }})
                                                }
                                            }}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                if(window.confirm("메뉴를 정말 삭제하시겠습니까?")) {
                                                    alert("메뉴가 삭제되었습니다.")
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

export default MMenuView;