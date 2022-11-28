import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function Login() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const navigate = useNavigate();
    const onLogin = () => {
        console.log([id, pw])
        if(id===''||pw==='') {
            alert('아이디 또는 비밀번호를 입력해주세요.')
        } else {
        const result = {};

                result["managerId"] = id
                result["managerPw"] = pw

                  console.log(result);
                             axios({
                                 url: "/api/login",
                                 method: 'post',
                                 data: result,
                                 baseUrl: "http://localhost:8080"
                             }).then((res) => {
                                 console.log(res)

            if(res.data !== "NULL") {
                alert('확인되었습니다 :)')
                sessionStorage.setItem('userId', id)
                console.log(sessionStorage.getItem('userId'))
                navigate('/manager/resvview')
            } else {
                alert('아이디 또는 비밀번호가 틀렸습니다.')
            }
           })
        }
    }

    return (
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <Stack alignItems="center" spacing={2}>
                <div style={{fontFamily:'NanumSquareB', fontSize:'64px', marginBottom:'30px'}}>JUMO!</div>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <div style={{width: '50px', fontSize: '18px'}}>ID</div>
                    <TextField 
                        label="" 
                        style={{width: '300px'}} 
                        inputProps={{style: {fontSize: '18px'}}} 
                        value={id}
                        onChange={(e) => {
                            setId(e.target.value)
                        }} />
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <div style={{width: '50px', fontSize: '18px'}}>PW</div>
                    <TextField 
                        label="" 
                        type="password"
                        style={{width: '300px'}} 
                        inputProps={{style: {fontSize: '18px'}}} 
                        value={pw}
                        onChange={(e) => {
                            setPw(e.target.value)
                        }} />
                </Stack>
                <button className="btn" style={{marginTop: '80px', fontSize: '16px'}} onClick={onLogin}>로그인</button>
            </Stack>
        </div>
    );
}

export default Login;