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
            var text = document.querySelector('#password').value;
            console.log(text);
                // eslint-disable-next-line
            let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
            if (regPass.test(text) === false) {
                alert('비밀번호 형식이 아닙니다.')
            }else {
                setPassCheck(true);
                if(userPw.value !== userPwCh.value) {
                    alert('비밀번호가 일치하지 않습니다.');
                }else {
                    // if(isNaN(formData.phone)){
                    //     alert("전화번호는 숫자만 입력해주세요");
                    //     setFormData({
                    //         ...formData,
                    //         phone: "",
                    //     })
                    // }
                    // input에 값이 있는지 체크하고
                    // 입력이 다되어있으면 post전송
                    if(formData.userId !== "" && formData.password !== "" &&
                    formData.userName !== "" && formData.phone !== "" &&
                    formData.email !== "" && formData.address !== "" && 
                    formData.adddetail !== ""){
                        console.log(sameCheck)
                        if(sameCheck && emailCheck){
                            addMember();
                        }else if(!sameCheck) {
                            alert('아이디 중복확인을 해주세요')
                        }else if(!emailCheck) {
                            alert('이메일 형식확인을 해주세요')
                        }
                    }
                    else {
                        alert("모든 기입란에 기입해주세요");
                    }
                }
            }

        }else{
            alert("등록이 취소되었습니다");
        }
    }
    async function addMember() {
        await axios.post(`${API_URL}/join`,formData)
        .then(result=>{
            console.log(result.data)
            console.log("안녕")
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
    const [ sameCheck, setSameCheck ] = useState(false);
    // console.log(sameCheck)
    const OnIdCh = async (e) => {
        let userId = document.querySelector('#id');
        var regId = /^[A-Za-z0-9]{8,12}$/;  
        const response = await axios.get(`${API_URL}/idCh`);
        const Iddb = response.data;
        let sameNum = 0;
        Iddb.forEach( id => {
            if(userId.value === id.userId){
                sameNum++;
            }
        });
        if(!userId.value){
            alert("아이디를 입력해주세요")
        } else {
            if(sameNum !== 0) {
                setFormData({
                    ...formData,
                    userId: "",
                })
                alert('중복아이디입니다.');
                
                console.log(sameCheck)
                console.log(userId)
                console.log(userId.value)
            }
            else if(!regId.test(userId.value)) {
                alert('영문과 숫자 8~12자 이내로 입력하세요.');
            }
            else {
                alert('사용가능한 아이디입니다.');
                setSameCheck(true);
            }
        }
        
    }
    const [ passCheck, setPassCheck ] = useState(false);
    const [ emailCheck, setEmailCheck ] = useState(false);
    function emailck() {
        var text = document.querySelector('#email').value;
        console.log(text);
            // eslint-disable-next-line
        var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (regEmail.test(text) === true) {
            alert('이메일 형식입니다.');
            setEmailCheck(true);
        }else {
            alert('이메일 형식이 아닙니다.')
        }
    }
    // function password(e) {
    //     var { name, value } = e.target;
    //     let regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    //     if(!regPass.test(value)) alert("영문, 숫자 조합으로 8-20자리 입력해주세요.")
    //     else {
    //         setFormData({
    //             ...formData,
    //             [name]:value
    //         })
    //         return value;
    //     }
    // }
    function phoneNumber(e) {
        var { name, value } = e.target;
        // if (!value) {
        //   return "";
        // }
      
        value = value.replace(/[^0-9]/g, "");
      
        let result = [];
        let restNumber = "";
      
        // 지역번호와 나머지 번호로 나누기
        if (value.startsWith("02")) {
          // 서울 02 지역번호
          result.push(value.substr(0, 2));
          restNumber = value.substring(2);
        } else if (value.startsWith("1")) {
          // 지역 번호가 없는 경우
          // 1xxx-yyyy
          restNumber = value;
        } else {
          // 나머지 3자리 지역번호
          // 0xx-yyyy-zzzz
          result.push(value.substr(0, 3));
          restNumber = value.substring(3);
        }
      
        if (restNumber.length === 7) {
          // 7자리만 남았을 때는 xxx-yyyy
          result.push(restNumber.substring(0, 3));
          result.push(restNumber.substring(3));
        } else {
          result.push(restNumber.substring(0, 4));
          result.push(restNumber.substring(4));
        }
        value = result.filter((val) => val).join("-");
        setFormData({
            ...formData,
            [name]:value
        })
        return value;
      }
      console.log("비번"+passCheck)
    return (
        <div id="memberJoin">
        <div id="back">
        </div>
        <form id="joinform" onSubmit={onSubmit}>
            <table>
                <tbody>
                    {/* <tr>
                        <th colSpan={2}>
                            회원가입
                        </th>
                    </tr> */}
                    <tr>
                        <td className="join_left">ID</td>
                        <td className="join_right">
                            <input placeholder="영문, 숫자 조합 8-12자리 입력" type="text" id="id" name="userId" value={formData.userId} onChange={onChange} />
                            <span id ="duCk" onClick={(e)=>{OnIdCh(e);}}>CHECK</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">PASSWORD</td>
                        <td className="join_right">
                        <input className='margin' placeholder="영문, 숫자 조합 8-20자리 입력" type="password" id="password" name="password" value={formData.password} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">PASSWORD CHECK</td>
                        <td className="join_right">
                        <input className='margin' type="password"  id="passwordCk" name="passwordCk" value={formData.passwordCk} onChange={(e)=>{onChange(e); OnPwCh(e);}}/>
                        <p id="passInform"></p>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">NAME</td>
                        <td className="join_right">
                        <input className='margin' type="text" name="userName" value={formData.userName} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">PHONE</td>
                        <td className="join_right">
                        <input placeholder="숫자만 입력 가능" id='pn' className='margin' type="text" name="phone" value={formData.phone} onChange={phoneNumber}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">E-MAIL</td>
                        <td className="join_right">
                            <input placeholder="숫자, 영문@aaa.com 형식" className='margin' type="text" name="email" id="email" value={formData.email} onChange={onChange}/>
                            <span id ="emailck" onClick={emailck}>CHECK</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="join_left">ADDRESS</td>
                        <td className="join_right">
                            <input className='margin' name="address" type="text" value={formData.address} onChange={onChange}/>
                            <input className='margin_n' name="adddetail" type="text" value={formData.adddetail} onChange={onChange}/>
                            <button id="add_btn" type="button" onClick={openPostCode} >SEARCH</button>
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
                        <td colSpan={2} className="btns">
                        <button className='btn' type="submit">join</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className='or_td'>
                            or
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} id='go_center' className="btns">
                        <button className='btn' type="reset" onClick={()=>{navigate('/')}}>deny</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
};

export default MemberJoin;