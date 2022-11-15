import React, {useState, useEffect} from 'react';
import Start from "./Start";
import "./css/ResvCreate.css";

function ResvCreate() {
    var isManager = false; // 우선 고객용부터
    const [start, setStart] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setStart(false)
        }, 2500);
    });

    return (
        <>
            {
                start === true ?
                    Start(false) :
                    <>
                        {isManager ?
                            <></> :
                            <div className="toManager">
                                관리자이신가요?
                            </div>
                        }
                        <div className="toHome">JUMO!</div>
                        <div className="box">
                            <div className="menu">
                                <div className="btn on">예약 등록</div>
                                <div className="btn">예약 조회/변경</div>
                                <div className="btn">예약 취소</div>
                            </div>
                            <div className="content">
                                <div className="guide">등록할 예약 정보를 입력하세요</div>
                                <div className="title">예약 정보</div>
                                <div className="subcontent">
                                    <div className="subtitle">날짜 및 시간</div>
                                    <div>dd</div>
                                </div>
                                <div className="subcontent">
                                    <div className="subtitle">인원</div>
                                    <div>dd</div>
                                </div>
                                <div className="subcontent">
                                    <div>
                                        <div className="subtitle">메뉴</div>
                                        <div style={{color: "#5B9BD5", fontSize: "12px"}}>총 68,000원</div>
                                    </div>
                                    <div>dd</div>
                                </div>
                                <div style={{height: 10}}></div>
                                <div className="title">예약자 정보</div>
                                <div className="subcontent">
                                    <div className="subtitle">이름</div>
                                    <div>dd</div>
                                </div>
                                <div className="subcontent">
                                    <div className="subtitle">전화번호</div>
                                    <div>dd</div>
                                </div>
                                <div className="subcontent">
                                    <div className="subtitle">비밀번호</div>
                                    <div>dd</div>
                                </div>
                                <div className="subcontent">
                                    <div className="subtitle">요청사항</div>
                                    <div>dd</div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    );
}

export default ResvCreate;