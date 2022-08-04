import React from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts.js';
import Goods1Component from './goods';

async function getGoods(){
    const response = await axios.get(`${API_URL}/goods1`);
    return response.data;
}

const Goods1Page = () => {
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
                <h1>Batman Begins<br/>2005</h1>
            </div>
            <div id="whole">
                <ul>
                    {goods.map(goods=>(
                        <Goods1Component key={goods.id} goods={goods}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Goods1Page;