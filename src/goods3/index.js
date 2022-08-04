import React from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts.js';
import Goods3Component from './goods3';

async function getGoods(){
    const response = await axios.get(`${API_URL}/goods3`);
    return response.data;
}

const Goods3Page = () => {
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
                <h1>The Dark Knight Rises<br/>2012</h1>
            </div>
            <div id="whole">
                <ul>
                    {goods.map(goods=>(
                        <Goods3Component key={goods.id} goods={goods}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Goods3Page;