import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './DetailGoods.css';
import CounterContainer from './CounterContainer';
import { useSelector, useDispatch  } from 'react-redux'
import {  reset } from '../module/counter';

async function getGoods(id){
    const response = await axios.get(`${API_URL}/detailview2/${id}`);
    return response.data;
}  

const DetailGoods = () => {
    const dispatch = useDispatch();
    const onReset = () => dispatch(reset());
    const { number } = useSelector(state => (state.counter));
    console.log(number);
    const { id } = useParams();
    const navigate = useNavigate();
    const idid = sessionStorage.getItem('loginId');
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
            c_user_id: idid,
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

    function addReserve(){
        if(window.confirm("예매하시겠습니까?") && idid){
            axios.put(`${API_URL}/addReservation`, goData)
            .then((result)=>{
                console.log(result);
            })
            .catch(e=>{
                console.log(e);
            })
            navigate(`/mypage/${idid}`);
        } 
         else {
            if(idid) alert("예매가 취소되었습니다.");
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

    if(loading)  return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!goods) return null;
    return (
        <div id="detail_goods">
            <div id="back">
            </div>
            <div id="bg"></div>
            <div id='btns'>
            {idid === 'admin' ?  <button><Link to={`/editgoods/${id}`}>수정</Link></button> : ''} 
            {idid === 'admin' ?  <button onClick={onDelete}>삭제</button> : ''} 
            </div>
            <div id="left_detail">
                <div id="detail_img"><img src={`../${goods.proimgsrc}`} alt="goodsimg" /></div>
            </div>
            <div id="right_detail">
                <p id="p_title1">{goods.proname}</p>
                <p id="p_title2">{goods.prodescript}</p>
                <p id="p_title3">가격: {Number(goods.price)*number}원</p>
                <div id="gopurchace">
                    <CounterContainer />
                    <button id="purchace" onClick={addReserve}>장바구니 담기</button>
                </div>
            </div>
        </div>
    );
};

export default DetailGoods;