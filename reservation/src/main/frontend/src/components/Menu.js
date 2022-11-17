import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="menu">
            <div className="menuBtn">
                <Link to="/resvcreate" className="menuLink">
                    예약 등록
                </Link>
            </div>
            <div className="menuBtn">
                <Link to="/resvview" className="menuLink">
                    예약 조회/변경
                </Link>
            </div>
            <div className="menuBtn">
                <Link to="/resvcancel" className="menuLink">
                    예약 취소
                </Link>
            </div>
        </div>
    );
}

export default Menu;