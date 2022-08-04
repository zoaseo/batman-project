import React, { useState } from 'react';
import './MemberLogin.css'
import { API_URL } from '../config/contansts';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useResultContext } from '../Contexts/context';

export const MemberLogin = () => { 
    const navigate = useNavigate();
    // eslint-disable-next-line
    let [loginId, setLoginId] = useState("");
    // eslint-disable-next-line
    let [loginPassword, setLoginPassword] = useState("");
    // const { savedLoginId, setSavedLoginId } = useResultContext();
    // const { savedLoginPassword, setSavedLoginPassword } = useResultContext("")
    // eslint-disable-next-line
    let [savedLoginId, setSavedLoginId] = useState("");
    // eslint-disable-next-line
    let [savedLoginPassword, setSavedLoginPassword] = useState("");
    const Login = async () => {
        let userId = document.querySelector('#userID');
        let userPw = document.querySelector('#userPW');
        if(userId.value === "" || userPw.value === "") {
            alert("아이디와 비밀번호 모두 입력해주세요");
        } else {
            const response = await axios.get(`${API_URL}/getId/${userId.value}`);
            const getId = response.data;
            const response2 = await axios.get(`${API_URL}/getPw/${userId.value}`);
            const getPw = response2.data;

            if(getId.length <= 0) {
                alert("등록된 아이디가 없습니다.");
            } else {
                const getId2 = getId[0].userId;
                const getPw2 = getPw[0].password;
                // eslint-disable-next-line
                let userId_value = userId.value;
                let userPw_value = userPw.value;
                if(userPw_value === getPw2) {
                    sessionStorage.setItem("loginId", getId2);
                    sessionStorage.setItem("loginPassword", getPw2);
                    setSavedLoginId(sessionStorage.getItem("loginId"));
                    setSavedLoginPassword(sessionStorage.getItem("loginPassword"));
                    console.log(JSON.stringify(sessionStorage));
                    navigate('/');
                } else {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            }
        }
    }

    return (
    <div id="memberLogin">
        <div id="back">
        </div>
        <form id="loginform">
            <table>
                <tbody>
                    <tr>
                        <th id="loginth" colSpan={2}>
                            로그인
                        </th>
                    </tr>
                    <tr>
                        <td className='login_left'>아이디</td>
                        <td className='login_right'>
                            <input type="text" id="userID" name="userID" onChange={(e)=>{
                                    setLoginId(e.target.value);
                            }}/>
                        </td>
                    </tr>
                    <tr>
                        <td className='login_left'>비밀번호</td>
                        <td className='login_right'>
                        <input type="password" id="userPW" name="userPW" onChange={(e) => {
                            setLoginPassword(e.target.value);
                        }}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} id="spans">
                            <span onClick={Login} id="span_login">로그인</span>
                            <Link to='/join'><span id="span_logout">회원가입</span></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
};

export default MemberLogin;