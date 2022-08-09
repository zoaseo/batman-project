import React, { useEffect } from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts.js';
import Goods2Component from './goods2';

async function getGoods(){
    const response = await axios.get(`${API_URL}/goods2`);
    return response.data;
}

const Goods2Page = () => {
    const introText = document.querySelectorAll(".titlelogo span");
    useEffect(()=>{
        let timer = 100;
        introText.forEach((item) => {
          item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
        });
      },[introText])
    const [state] = useAsync(getGoods, [])
    const { loading, data: goods, error } = state;
    if(loading)
    return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!goods) return <div>로딩중입니다.</div>
    return (
        <div>
            <div id="back">
            </div>
            <div className='titlelogo'>
                <h1>
                    <span>T</span>
                    <span>h</span>
                    <span>e</span>
                    <span> </span>
                    <span>D</span>
                    <span>a</span>
                    <span>r</span>
                    <span>k</span>
                    <span> </span>
                    <span>K</span>
                    <span>n</span>
                    <span>i</span>
                    <span>g</span>
                    <span>h</span>
                    <span>t</span>
                </h1>
            </div>
            <div id="whole2">
                <ul>
                    {goods.map(goods=>(
                        <Goods2Component key={goods.id} goods={goods}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Goods2Page;