import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import Menu from '../components/Menu';

function UserAuth(setAuth) {
    const onClickAuth = () => {
        setAuth(true);
    };

    return (
        <>
            <Header />
            <div className="box">
                <Menu />
                <div className="content" style={{minWidth: '1000px'}}>
                    <div className="guide">예약자 정보를 입력하세요</div>
                    <Stack direction="row" alignItems="center" className="subcontent" mt={5}>
                        <div className="subtitle">이름</div>
                        <TextField label="" variant="outlined" size="small" style={{width: '120px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="이름" />
                    </Stack>
                    <Stack direction="row" alignItems="center" className="subcontent" mt={2}>
                        <div className="subtitle">비밀번호</div>
                        <TextField type="password" label="" variant="outlined" size="small" style={{width: '150px'}} inputProps={{style: {fontSize: '14px'}}} placeholder="" />
                    </Stack>
                    <div style={{marginLeft: '45%', marginTop: '100px'}}>
                        <button variant="outlined" className="btn" onClick={onClickAuth}>확인</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserAuth;