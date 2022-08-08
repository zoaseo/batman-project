import Aos from 'aos';
import React, { useEffect } from 'react';
import '../components/aos.css';
import { Link } from 'react-router-dom';

const BeginsComponent = ({ character }) => {
    useEffect(()=> {
        Aos.init({
            duration: 2000
        })
    })
    return (
        <li data-aos="fade-up" className="AllContent">
            <Link to={`/detailview/${character.id}`}>
                {/* <div> */}
                    <div id="imgimg"><img src={`/${character.imgsrc}`} alt="actor"/></div>
                {/* </div> */}
                {/* <div id="li_right"> */}
                    <p id='p_title1' className='tt'>{character.actor}</p>
                    <p id='p_title2' className='tt'>{character.role}</p>
                    {/* <div id='p_title3' className='tt'>
                        <div id="small_detail"><Link to={`/detailview/${character.id}`}>Show more</Link></div>
                    </div> */}
                {/* </div> */}
            </Link>
        </li>
    );
};

export default BeginsComponent;