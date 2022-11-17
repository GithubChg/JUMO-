import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Start.css";

function Start(isManager) {
    const navigate = useNavigate();
    const timeout = () => {
        setTimeout(() => {
            navigate("/resvcreate", { replace: true })
            console.log("go to home")
        }, 2000);
    };

    useEffect(() => {
        timeout();
        return() => {
            clearTimeout(timeout);
        };
    });

    isManager = false; // 확인용
    return (
        <>
            <div className="logo">
                JUMO!
                <div className="sublogo">
                    {isManager ? "관리자용" : "간단한 오마카세 예약"}
                </div>
            </div>
        </>
    );
}

export default Start;
