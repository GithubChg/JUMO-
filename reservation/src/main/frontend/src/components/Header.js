import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    var isManager = false; // 우선 고객용부터
    return (
        <div className="header">
            <Link to="/" className="toHome">JUMO!</Link>
            {isManager ?
                <></> :
                <div className="toManager">
                    관리자이신가요?
                </div>
            }
        </div>
    );
};

export default Header;