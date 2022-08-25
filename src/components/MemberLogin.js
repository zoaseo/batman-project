import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MemberLogin.css'
import { API_URL } from '../config/contansts';
import { setCookie } from '../util/cookie';
import { useDispatch } from 'react-redux';
import { goToHome, setLogin } from '../module/logincheck';

const MemberLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ loginData, setLoginData ] = useState({
        userId: "",
        password: ""
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
    const Login = async () => {
        let userId = document.querySelector('#userId');
        const response = await axios.get(`${API_URL}/getId/${userId.value}`);
        const getId = response.data;
        console.log(getId);
        if(getId.length <= 0) {
            alert("등록된 아이디가 없습니다.");
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        // 인풋에 입력했는지 체크
        if(loginData.userId === '' || loginData.password === ''){
            alert('아이디와 비밀번호를 입력해주세요');
        }else {
            axios.post(`${API_URL}/login`, loginData)
            // 로그인이 되었을 때
            .then(result=>{
                let { userId, userName } = result.data;
                console.log(result);
                // usermail에 값이 있을 때
                if(userId !== null && userId !== '' && userId !== undefined){
                    alert('로그인되었습니다.');
                    // 현재시간 객체를 생성
                    let expires = new Date();
                    // 60분 더한 값으로 변경
                    expires.setMinutes(expires.getMinutes()+60);
                    setCookie('userId', `${userId}`, {path: '/', expires});
                    setCookie('userName', `${userName}`, {path: '/', expires});
                    dispatch(setLogin());
                    dispatch(goToHome(navigate('/')));
                }else {
                    alert('아이디와 비밀번호를 확인해주세요');
                }
            })
            .catch(e=>{
                console.log(e)
                // alert('이메일과 비밀번호를 확인해주세요22');  // sdlfjljfdlasjfdlajflasfjlasfjl 원인불명
            })
        }
    }

    return (
    <div id="memberLogin">
        <div id="back">
        </div>
        <form onSubmit={onSubmit} id="loginform">
            <table>
                <tbody>
                    {/* <tr>
                        <th id="loginth" colSpan={2}>
                            Login
                        </th>
                    </tr> */}
                    <tr>
                        <td className='login_left'>ID</td>
                        <td className='login_right'>
                            <input type="text" id="userId" value={loginData.userId} onChange={onChange} name="userId"/>
                        </td>
                    </tr>
                    <tr>
                        <td className='login_left'>PASSWORD</td>
                        <td className='login_right'>
                        <input type="password" id="userPW" value={loginData.password} onChange={onChange} name="password"/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="btns">
                            <button onClick={Login} type="submit">login</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='or_td'>
                            or
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} id='go_center' className="btns">
                            <Link to='/join'><button>Join</button></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
};

export default MemberLogin;