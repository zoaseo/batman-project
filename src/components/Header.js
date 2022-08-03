import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    function OpenSitemap () {
        const site_map = document.querySelector('#site_map');
        site_map.style.left = '0px';
        site_map.style.zIndex = '2';
        const ham = document.querySelector('#ham');
        ham.style.opacity = '0';
    }
    function CloseSitemap () {
        const site_map = document.querySelector('#site_map');
        site_map.style.left = '-550px';
        site_map.style.zIndex = '1';
        const ham = document.querySelector('#ham');
        ham.style.opacity = '1';
    }
    function OpenUl () {
        const one = document.querySelector('#one');
        one.classList.toggle('ontoggle');
    }
    function OpenUl2 () {
        const two = document.querySelector('#two');
        two.classList.toggle('ontoggle');
    }
    function OpenUl3 () {
        const three = document.querySelector('#three');
        three.classList.toggle('ontoggle');
    }
    return (
        <div id="header">
            {/* <div id="back">
            </div> */}
            <div id="top_header">
                <div className='inner'>
                    <div id="ham" onClick={OpenSitemap}>
                        <span></span>
                        <span></span>
                    </div>
                    <div><h1><Link to="/">BATMAN</Link></h1></div>
                    <div>
                        <ul id="fff">
                            <li><Link to="detail">insert</Link></li>
                            <li><Link to="login">login</Link></li>
                            <li><Link to="join">join</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="site_map">
                <div>
                    <div id="hambuger_menu" onClick={CloseSitemap}>
                        <span></span>
                        <span></span>
                    </div>
                    <form>
                        <span id="sear_ico"><img src='../img/search.png' alt='search'/></span>
                        <input name='search' id='search'/>
                    </form>
                  
                    <ul id="header_ul">
                        <li>
                            <ul id='one' className="li_flex">
                                <li>
                                    <h2>batman begins</h2>
                                    <ul id="fir_ul">
                                        <li className='fir_li'><Link to="/first">characters</Link></li>
                                        <li>goods</li>
                                        <li>3</li>
                                        <li>4</li>
                                        <li>5</li>
                                    </ul>
                                </li>
                                <li><div onClick={OpenUl}>∨</div></li>  
                            </ul>
                        </li>
                        <li>
                            <ul id='two' className="li_flex">
                                <li>
                                    <h2>The Dark Knight</h2>
                                    <ul id="fir_ul">
                                        <li className='fir_li'><Link to="/second">characters</Link></li>
                                        <li>goods</li>
                                        <li>3</li>
                                        <li>4</li>
                                        <li>5</li>
                                    </ul>
                                </li>
                                <li><div onClick={OpenUl2}>∨</div></li>  
                            </ul>
                        </li>
                        <li>
                            <ul id='three' className="li_flex la_li">
                                <li>
                                    <h2>The Dark Knight Rises</h2>
                                    <ul id="fir_ul">
                                        <li className='fir_li'><Link to="/third">characters</Link></li>
                                        <li>goods</li>
                                        <li>3</li>
                                        <li>4</li>
                                        <li>5</li>
                                    </ul>
                                </li>
                                <li><div onClick={OpenUl3}>∨</div></li>  
                            </ul>
                        </li>

                    </ul>
                    <ul>

                    </ul>
                </div>
                <div id="header_footer">
                    <div>
                        <p>JOIN THE CONVERSATION</p>
                        <ul id='icon_flex'>
                            <li><a href="#"><img src='../img/facebook.png' alt=''/></a></li>
                            <li><a href="#"><img src='../img/instagram.png' alt=''/></a></li>
                            <li><a href="#"><img src='../img/twitter.png' alt=''/></a></li>
                        </ul>
                    </div>
                    <div>
                        <p id="iii">ⓒ 2022 BATMAN ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;