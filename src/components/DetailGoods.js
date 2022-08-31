import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './DetailGoods.css';
import CounterContainer from './CounterContainer';
import { useSelector, useDispatch  } from 'react-redux'
import {  reset } from '../module/counter';
import { getCookie } from '../util/cookie';

async function getGoods(id){
    const response = await axios.get(`${API_URL}/detailview2/${id}`);
    return response.data;
}  

const DetailGoods = () => {
    const dispatch = useDispatch();
    const onReset = () => dispatch(reset());
    const { number } = useSelector(state => (state.counter));
    const { id } = useParams();
    const navigate = useNavigate();
    const uid = getCookie('userId');
    const [ goData, setGoData ] = useState({
        c_user_id: "",
        c_user_name: "",
        c_user_imgsrc: "",
        c_user_count: "",
        c_user_price: "",
    })
    const [ state ] = useAsync(()=>getGoods(id),[id]);
    const { loading, data:goods, error } = state;

    useEffect(()=>{
        setGoData({
            c_user_id: uid,
            c_user_name: goods? goods.proname : "",
            c_user_imgsrc: goods? goods.proimgsrc : "",
            c_user_count: number,
            c_user_price: goods? goods.price : "",
        })
    // eslint-disable-next-line
    },[goods, number])
    useEffect(()=> {
        onReset();
        // eslint-disable-next-line
    },[])

    async function addReserve(){
        if(window.confirm("장바구니에 담으시겠습니까?") && uid){       
            axios.put(`${API_URL}/addReservation`, goData)
            .then((result)=>{
                console.log(result);
                if(result.data === "있음"){
                    alert('이미 담겨진 상품입니다.')
                    window.location.reload();
                }else {
                    axios.put(`${API_URL}/addReservation/${id}`)
                    .then((result)=>{
                        console.log(result);
                    })
                    .catch(e=>{
                        console.log(e);
                    })
                    if(window.confirm("장바구니에 담겼습니다. 마이페이지로 이동하시겠습니까?")){
                        navigate(`/mypage/${uid}`);
                    } else {}
                }
            })
            .catch(e=>{
                console.log(e);
            })
        } 
         else {
            if(uid) alert("취소되었습니다.");
            else alert('로그인 후 이용바랍니다.')
        }
    }

    // 굿즈 삭제
    const onDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.delete(`${API_URL}/delGoods/${id}`)
            .then(result=>{
                console.log("삭제되었습니다.");
                navigate("/"); // 리다이렉션 추가
            })
            .catch(e=>{
                console.log(e);
            })
        }else{
            alert("삭제가 취소되었습니다");
        }

    }
    if(loading)  return <div className="spinner_bg"><div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!goods) return null;
    return (
        <div id="detail_goods">
            <div id="back">
            </div>
            <div id="bg"></div>
            {/* <div id='btns'>
            {uid === 'admin123' ?  <button><Link to={`/editgoods/${id}`}>modify</Link></button> : ''} 
            {uid === 'admin123' ?  <button onClick={onDelete}>delete</button> : ''} 
            </div> */}
            <div id="left_detail">
                <div id="detailgoods_img"><img src={`${API_URL}/upload/${goods.proimgsrc}`} alt="goodsimg" /></div>
            </div>
            <div id="right_detail">
                <p id="d_title1">{goods.proname}</p>
                <p id="d_title2">{goods.prodescript}</p>
                <p id="d_title3">price: ￦{goods.price}</p>
                <div id='btns'>
            {uid === 'admin123' ?  <button><Link to={`/editgoods/${id}`}>modify</Link></button> : ''} 
            {uid === 'admin123' ?  <button onClick={onDelete}>delete</button> : ''} 
            </div>
                <div id="gopurchace">
                    <CounterContainer />
                    <button id="purchace" onClick={addReserve}>put</button>
                </div>
            </div>
        </div>
    );
};

export default DetailGoods;