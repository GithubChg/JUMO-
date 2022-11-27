import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div className="header">
            {props.isManager ?
                <>
                    <Link to="/manager/resvview" className="toHome" title="처음으로">JUMO!</Link>
                    <div style={{position: 'absolute', right: '60px', padding: '10px 0', fontSize: '12px'}}>
                        원규진님, 안녕하세요 :)
                    </div>
                </> : 
                <>
                    <Link to="/" className="toHome" title="처음으로">JUMO!</Link>
                    <Link to="/manager" className="toManager" title="관리자페이지로 이동">
                        관리자이신가요?
                    </Link>                
                </>
            }
        </div>
    );
};

export default Header;