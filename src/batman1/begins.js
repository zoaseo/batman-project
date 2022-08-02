import Aos from 'aos';
import React, { useEffect } from 'react';
import './begins.css';
import '../components/aos.css';
// import { Link } from 'react-router-dom';

const BeginsComponent = ({ character }) => {
    useEffect(()=> {
        Aos.init({
            duration: 2000
        })
    })
    return (
        <li data-aos="fade-up" className="AllContent">
            {/* <Link> */}
                <div>
                    <div id="imgimg"><img src={`/${character.imgsrc}`} alt="actor"/></div>
                </div>
                <div id="li_right">
                    <p id='p_title1'>{character.actor}</p>
                    <p id='p_title2'>{character.role}</p>
                    <div id='p_title3'>
                        <div id="small_detail">Show more</div>
                    </div>
                </div>
            {/* </Link> */}
        </li>
    );
};

export default BeginsComponent;