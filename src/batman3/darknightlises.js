import Aos from 'aos';
import React, { useEffect } from 'react';
import '../components/aos.css';
import { Link } from 'react-router-dom';

const DarknightLisesComponent = ({ character }) => {
    useEffect(()=> {
        Aos.init({
            duration: 2000
        })
    })
    let a = ["zoom-out-right","zoom-out-left","zoom-in-up","zoom-in-down","fade-down-right","fade-down-left","fade-up-right","fade-up-left","flip-up"];
    let ran = Math.floor(Math.random() * 9);
    return (
        <li data-aos={`${a[ran]}`} className="AllContent">
            <Link to={`/detailview/${character.id}`}>
                <div id="imgimg"><img src={`/${character.imgsrc}`} alt="actor"/></div>
                <p id='p_title1' className='tt'>{character.actor}</p>
                <p id='p_title2' className='tt'>{character.role}</p>
            </Link>
        </li>
    );
};

export default DarknightLisesComponent;