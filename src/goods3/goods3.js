import Aos from 'aos';
import React, { useEffect } from 'react';
import '../components/aos.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts';

const Goods3Component = ({ goods }) => {
    useEffect(()=> {
        Aos.init({
            duration: 2000
        })
    })
    return (
        <li data-aos="fade-up" className="GContent">
            <div>
                <div id="gimg"><img src={`${API_URL}/upload/${goods.proimgsrc}`} alt="actor"/></div>
            </div>
            <div id="li_right">
                <p id='g_title1' className='tt'>{goods.proname}</p>
                <p id='g_title2' className='tt'>{goods.prodescript}</p>
                <p id='g_title3' className='tt'>{goods.price}원</p>
                <div id='g_title4' className='tt'>
                    <div id="g_detail"><Link to={`/detailview2/${goods.id}`}>Show more</Link></div>
                </div>
            </div>
        </li>
    );
};

export default Goods3Component;