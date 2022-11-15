import React from 'react';
import "./css/Start.css";

function Start(isManager) {
    // isManager = true; // 확인용
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
