import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout(props) {
    const navigate = useNavigate();
    const onClickLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            sessionStorage.clear()
            navigate("/manager")
        }
    }

    return (
        <div>
            <div className="logout" onClick={onClickLogout}>로그아웃</div>
        </div>
    );
}

export default Logout;