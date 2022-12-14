import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/contansts';
import './MyPage.css'
import { useNavigate } from 'react-router-dom';
import useAsync from '../customHook/useAsync';

const MypageComponent = ({data}) => {
    // eslint-disable-next-line
    const navigate = useNavigate();
    const onDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.delete(`${API_URL}/delReservation/${data.id}`)
            .then(result=>{
                console.log("삭제되었습니다.");
            })
            .catch(e=>{
                console.log(e);
            })
        }else{
            alert("삭제가 취소되었습니다");
        }

    }
    const [ count, setCount ] = useState({
        c_user_count: "",
        c_user_pay: ""
    });
    async function getCountPrice(){
        const response = await axios.get(`${API_URL}/countprice/${data.id}`);
        return response.data;
    }  
    const [ state ] = useAsync(()=>getCountPrice(),[data.id]);
        // eslint-disable-next-line
    const { loading, data:cp, error } = state;
    useEffect(()=>{
        setCount({
            c_user_count: cp? cp.user_count : "",
            c_user_pay: cp? cp.user_price * cp.user_count : ""
        })
    },[cp])
    async function increase(e) {
        e.preventDefault();
        setCount({
            ...count,
            c_user_count: count.c_user_count + 1,
            c_user_pay: count.c_user_pay + data.user_price
        })
    }
    async function decrease(e) {
        e.preventDefault();
        setCount({
            ...count,
            c_user_count: count.c_user_count > 1 ? count.c_user_count - 1 : 1,
            c_user_pay: count.c_user_count > 1 ? count.c_user_pay - data.user_price : count.c_user_pay 
        })
    }
    async function onEdit() {
        await axios.put(`${API_URL}/editpack/${data.id}`,count)
        .then((result)=>{
            console.log(result);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    // if(loading) return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    // if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    // if(!cp) return null;
    // console.log(data)
    return (
        <tr>
            <td id="imgtd"><img src={`${API_URL}/upload/${data.user_imgsrc}`} alt="imgpro"/></td>
            <td>{data.user_name}</td>
            <td>
                <span className='btnbtn'><button onClick={decrease}>-</button></span>
                {count.c_user_count}
                <span className='btnbtn'><button onClick={increase}>+</button></span>    
            </td>
            <td>￦{count.c_user_pay}</td>
            <td id="delBtn"><button onClick={onEdit}>change</button><button onClick={onDelete}>delete</button></td>
        </tr>
    );
};

export default MypageComponent;