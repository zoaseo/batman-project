import React from 'react';
import './begins.css';
import { Link } from 'react-router-dom';

const BeginsComponent = () => {
    return (
        <div>
            <div id="back">
            </div>
            <div id="whole">
                <li className="AllContent">
                    <Link>
                        <span id="span_locaion"></span>
                        <div ><img src='' alt="singer_pic" /></div>
                        <span className='span_title'></span>
                        <div className='span_title' id="godetail">
                            <div id="small_detail">Show more</div>
                            <div id="small_ticket_icon"><img src='/concert.png' alt="ticket"/></div>
                        </div>
                    </Link>
                </li>
            </div>
        </div>
    );
};

export default BeginsComponent;