import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import './MyPage.css';
import { API_URL } from '../config/contansts';
import MypageComponent from './MypageComponent';
import { useParams } from 'react-router-dom';
import { getCookie } from '../util/cookie';

const MyPage = () => {
    async function getOrder(idid){
        const response = await axios.get(`${API_URL}/mypage/${idid}`);
        return response.data;
    }  
    const { idid } = useParams();
    const [ state ] = useAsync(()=>getOrder(idid),[idid]);
    const { loading, data: datas, error } = state;
    const uname = getCookie('userName');
    const [ pay ,setPay ] = useState({
        c_user_pay: ""
    });
    
    async function getTotal(idid){
        const response = await axios.get(`${API_URL}/total/${idid}`);
        return response.data;
    }  
    const [ to ] = useAsync(()=>getTotal(idid),[idid]);
    const { l, data: data, e } = to;
    useEffect(()=>{
        setPay({
            c_user_pay: data? data.total : "",
        })
    },[data])
    if(loading)  return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!datas) return <div></div>;
    return (
        <div id="Mypage">
            <div id="back">
            </div>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={7}>
                                {uname}님의 장바구니입니다.
                            </th>
                        </tr>
                        <tr id="table_tr">
                            <td>제품</td>
                            <td>제품명</td>
                            <td>수량</td>
                            <td>가격</td>
                        </tr>
                        {datas.length === 0 ? <tr><td id="noreserve" colSpan={6}>담긴 제품이 없습니다.</td></tr>
                        : datas.map((data, index)=>(<MypageComponent key={index} data={data}/> ))}
                    </tbody>
                </table>
            </form>
            <div id="total">
                <p>총주문금액: {pay.c_user_pay}원</p>
            </div>
        </div>
    );
};

export default MyPage;