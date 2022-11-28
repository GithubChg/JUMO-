import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "./css/styles.css";
import { Image } from '@mui/icons-material';
import Logout from '../components/Logout';
import axios from 'axios';

function MMenuView(props) {
    const navigate = useNavigate();
    const [menuList, setMenuList] = useState([]);
    const columns = ['이름', '설명', '금액', '재고', '']
    const ls = []
    axios({
        url: "/api/readMenuList",
        method: 'post',
        baseUrl: "http://localhost:8080"
    }).then((res) => {
        console.log("통신 성공")
        const data = res.data.menuList


        for (var i=0; i<data.length; i++) {
           ls.push({
            name: data[i].menuName,
            comment: data[i].comment,
            price: data[i].price,
            stock: data[i].stock,
           });
        }
        console.log(ls)
        setMenuList(ls)

    })

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
                            {menuList.map((item, idx) => (
                                <tr key={item.name+item.number}>
                                    <td width="80px">{item.name}</td>
                                    <td width="200px">{item.name1}</td>
                                    <td width="80px">{item.price}</td>
                                    <td width="40px">{item.people}</td>
                                   

                                    <td width="50px">
                                        <Stack direction="row">
                                            <IconButton onClick={() => {
                                                if(window.confirm("메뉴를 변경하시겠습니까?")) {
                                                    alert("메뉴 변경 페이지로 이동합니다.")
                                                    navigate("/manager/mmenumodify", {state: {
                                                        name: menuList[idx].name,
                                                        name1: menuList[idx].name1,
                                                        price: menuList[idx].price,
                                                        people: menuList[idx].people,
                                                    }})
                                                }
                                            }}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                if(window.confirm("메뉴를 정말 삭제하시겠습니까?")) {
                                                    alert("메뉴가 삭제되었습니다.")
                                                    const newData = menuList.filter((d) => d.number !== item.number);
//                                                    setData(newData);
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