import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Start.css";

function Start(props) {
    const navigate = useNavigate();
    const timeout = () => {
        setTimeout(() => {
            console.log(props.isManager);
            props.isManager 
            ? sessionStorage.getItem('userId')===null
            ? navigate("/login") 
            : navigate("/manager/resvview")
            : navigate("/resvcreate");
        }, 1000);
    };

    useEffect(() => {
        timeout();
        return() => {
            clearTimeout(timeout);
        };
    });

    return (
        <>
            <div className="logo">
                JUMO!
                <div className="sublogo">
                    {props.isManager ? "관리자용" : "간단한 오마카세 예약"}
                </div>
            </div>
        </>
    );
}

export default Start;
