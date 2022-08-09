import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './MemberJoin.css'
import PopupDom from "./PopupDom"
import PopupPostCode from "./PopupPostCode"

const MemberJoin = () => {
    const navigate = useNavigate(); // 리다이렉션
    // 우편번호 관리하기
    const onAddData = (data) => {
       console.log(data);
       setFormData({
           ...formData,
           address: data.address,
       })
   }
   // 팝업창 상태 관리
   const [ isPopupOpen, setIsPopupOpen ] = useState(false);
   // 팝업창 상태 true로 변경
   const openPostCode = ()=> {
       setIsPopupOpen(true);
   }
   // 팝업창 상태 false로 변경
   const closePostCode = () => {
       setIsPopupOpen(false);
   }
    const [ formData, setFormData ] = useState({
        userId: "",
        password: "",
        userName: "",
        phone: "",
        email: "",
        address: "",
        adddetail: ""
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    // 폼 submit 이벤트
    const onSubmit = (e) => {
        const userPw = document.querySelector('#password');
        const userPwCh = document.querySelector('#passwordCk');
        if(window.confirm("등록하시겠습니까?")){
            e.preventDefault();
            if(userPw.value !== userPwCh.value) {
                alert('비밀번호가 일치하지 않습니다.');
            }else {
                if(isNaN(formData.phone)){
                    alert("전화번호는 숫자만 입력해주세요");
                    setFormData({
                        ...formData,
                        phone: "",
                    })
                }
                // input에 값이 있는지 체크하고
                // 입력이 다되어있으면 post전송
                else if(formData.userId !== "" && formData.password !== "" &&
                formData.userName !== "" && formData.phone !== "" &&
                formData.email !== "" && formData.address !== "" && 
                formData.adddetail !== ""){
                    addMember();
                }
                else {
                    alert("모든 기입란에 기입해주세요");
                }
            }
        }else{
            alert("등록이 취소되었습니다");
        }
    }
    function addMember() {
        axios.post(`${API_URL}/join`,formData)
        .then(res=>{
            alert('등록되었습니다.');
            navigate('/');
        })
        .catch(e=>{
            console.log(e);
        })
    }
    const OnPwCh = () => {
        const userPw = document.querySelector('#password');
        const userPwCh = document.querySelector('#passwordCk');
        const passInform = document.querySelector('#passInform');
        userPwCh.addEventListener('keyup',function(){
            if(userPw.value !== userPwCh.value) {
                passInform.innerHTML = '비밀번호가 일치하지 않습니다.';
                console.log('비밀번호가 일치하지 않습니다.');
            }else {
                passInform.innerHTML = '비밀번호가 일치합니다.';
                console.log('비밀번호가 일치합니다.');
            }
        })
    }
    const OnIdCh = async (e) => {
        let userId = document.querySelector('#id');
        const response = await axios.get(`${API_URL}/idCh`);
        const Iddb = response.data;
        let sameNum = 0;
        Iddb.forEach( id => {
            if(userId.value === id.userId){
                sameNum++;
            }
        });
        if(sameNum !== 0) {
            setFormData({
                ...formData,
                id: "",
            })
            alert('중복아이디입니다.');

            console.log(userId)
            console.log(userId.value)
        }else {
            alert('사용가능한 아이디입니다.');
        }
    }
    function emailck() {
        var text = document.querySelector('#email').value;
        console.log(text);
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (regEmail.test(text) === true) {
            alert('이메일 형식입니다.');
        }else {
            alert('이메일 형식이 아닙니다.')
        }
    }
    return (
        <div id="memberJoin">
        <div id="back">
        </div>
        <form id="joinform" onSubmit={onSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>
                            회원가입
                        </th>
                    </tr>
                    <tr>
                        <td className="join_left">아이디</td>
                        <td className="join_right">
                            <input type="text" id="id" name="userId" value={formData.userId} onChange={onChange} />
                            <span id ="duCk"onClick={(e)=>{OnIdCh(e);}}>중복확인</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">비밀번호</td>
                        <td className="join_right">
                        <input className='margin' type="password" id="password" name="password" value={formData.password} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">비밀번호 확인</td>
                        <td className="join_right">
                        <input className='margin' type="password"  id="passwordCk" name="passwordCk" value={formData.passwordCk} onChange={(e)=>{onChange(e); OnPwCh(e);}}/>
                        <p id="passInform"></p>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">이름</td>
                        <td className="join_right">
                        <input className='margin' type="text" name="userName" value={formData.userName} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">전화번호</td>
                        <td className="join_right">
                        <input className='margin' type="text" name="phone" value={formData.phone} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">이메일</td>
                        <td className="join_right">
                            <input placeholder="숫자나 알파벳(소/대문자)@" className='margin' type="text" name="email" id="email" value={formData.email} onChange={onChange}/>
                            <span id ="emailck" onClick={emailck}>형식확인</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">주소</td>
                        <td className="join_right">
                            <input className='margin' name="address" type="text" value={formData.address} onChange={onChange}/>
                            <input className='margin_n' name="adddetail" type="text" value={formData.adddetail} onChange={onChange}/>
                            <button id="add_btn" type="button" onClick={openPostCode} >우편번호 검색</button>
                            <div id="popupDom">
                            {isPopupOpen && (
                                <PopupDom>
                                    <PopupPostCode onClose={closePostCode}
                                    onAddData={onAddData}
                                    />
                                </PopupDom>
                            )}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} id="btns">
                           <button className='btn' type="submit">등록</button>
                           <button className='btn' type="reset">취소</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
};

export default MemberJoin;