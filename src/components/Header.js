import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { getCookie, removeCookie } from '../util/cookie';
import { setLogout } from '../module/logincheck';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../config/contansts.js';

const Header = () => {
    const Navigate = useNavigate();
    function goHome() {
        Navigate('/');
    }
    // var mql = window.matchMedia("screen and (max-width: 768px)");

    // if (mql.matches) {
    //     console.log("화면의 너비가 768px 보다 작습니다.");
    // } else {
    //     console.log("화면의 너비가 768px 보다 큽니다.");
    // }
    const isMobile = window.matchMedia("screen and (min-width: 320px) and (max-width:479px)").matches;
    console.log(isMobile)
    if (isMobile) {
        // mobile only code
    }
    function OpenSitemap () {
        const site_map = document.querySelector('#site_map');
        site_map.style.left = '0px';
        site_map.style.zIndex = '2';
        const ham = document.querySelector('#ham');
        ham.style.opacity = '0';
    }
    function CloseSitemap () {
        const site_map = document.querySelector('#site_map');
        if (isMobile) {
            // mobile only code
            site_map.style.left = '-100%';
            console.log("gkgk"+isMobile)
        }
        site_map.style.left = '-550px';
        site_map.style.zIndex = '1';
        const ham = document.querySelector('#ham');
        ham.style.opacity = '1';
        const one = document.querySelector('#one');
        one.classList.remove('ontoggle');
        const d1 = document.querySelector("#d1");
        d1.classList.remove('go');
        const two = document.querySelector('#two');
        two.classList.remove('ontoggle');
        const d2 = document.querySelector("#d2");
        d2.classList.remove('go');
        const three = document.querySelector('#three');
        three.classList.remove('ontoggle');
        const d3 = document.querySelector("#d3");
        d3.classList.remove('go');
        const sear_ico2 = document.querySelector('#sear_ico2');
        sear_ico2.classList.remove('do');
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
        const img_flex = document.querySelector("#img_flex");
        img_flex.style.height = '0px';
        const search = document.querySelector('#search');
        search.value = "";
    }
    function OpenUl () {
        const one = document.querySelector('#one');
        one.classList.toggle('ontoggle');
        const d1 = document.querySelector("#d1");
        d1.classList.toggle("go");
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
    }
    function OpenUl2 () {
        const two = document.querySelector('#two');
        two.classList.toggle('ontoggle');
        const d2 = document.querySelector("#d2");
        d2.classList.toggle("go");
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
    }
    function OpenUl3 () {
        const three = document.querySelector('#three');
        three.classList.toggle('ontoggle');
        const d3 = document.querySelector("#d3");
        d3.classList.toggle("go");
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
    }
    const uname = getCookie('userName');
    const uid = getCookie('userId');
    const isLogin = useSelector(state=>state.logincheck.isLogin);
    const dispatch = useDispatch();
    const logoutClick = () => {
        removeCookie('userName');
        removeCookie('userId');
        dispatch(setLogout());
        alert('로그아웃되었습니다.')
    }
    const [ imgSrc , setImgSrc ] = useState([]);
    useEffect(()=>{},[isLogin, imgSrc]);
    const onChangeSearch = async (e) =>{ 
        const input_value = e.target.value;
        console.log(input_value);
        const response = await axios.get(`${API_URL}/search/${input_value}`);
        setImgSrc([...response.data]);
    }
    function onClickForm() {
        const hul = document.querySelector("#header_ul");
        hul.style.top = '1000px';
        const sear_ico2 = document.querySelector('#sear_ico2');
        sear_ico2.classList.add('do');
        sear_ico2.classList.remove('do2');
        const img_flex = document.querySelector("#img_flex");
        img_flex.style.height = '600px'
        if (isMobile) {
            // mobile only code
            img_flex.style.height = '550px'
        }
    }
    function onClickSpan() {
        const sear_ico2 = document.querySelector('#sear_ico2');
        sear_ico2.classList.add('do2');
        sear_ico2.classList.remove('do');
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
        const img_flex = document.querySelector("#img_flex");
        img_flex.style.height = '0px';
    }
    return (
        <div id="header">
            <div id="top_header">
                <div className='inner'>
                    <div id="ham" onClick={OpenSitemap}>
                        <span></span>
                        <span></span>
                    </div>
                    <div><h1><Link to="/">BATMAN</Link></h1></div>
                    <div>
                        <ul id="fff">
                            {uname === 'admin123' ? <li><Link to="/insert">insert</Link></li> : ''}
                            {isLogin === false ? <li><Link to="/login">login</Link></li> : <>{ uname === 'admin123' ? <><li>{uname}</li><li id="pointer" onClick={()=>{goHome(); logoutClick();}}>logout</li></> : <><li>welcome {uname}</li><li id="pointer" onClick={()=>{goHome(); logoutClick();}}>logout</li></>}</>}
                            {isLogin === false ? <li><Link to="/join">join</Link></li> : ''}    
                            {isLogin === false ? '' :  <li><Link to={`/mypage/${uid}`}>mypage</Link></li>}
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
                    <form id='sear_form'>
                        <span id="sear_ico"><img src='../img/search.png' alt='search'/></span>
                        <input name='search' id='search' onClick={onClickForm} onKeyUp={onChangeSearch}/>
                        <span onClick={onClickSpan} id="sear_ico2"><img src="../img/down.png" alt="down"/></span>
                        <ul id="img_flex">
                            {imgSrc.map(list=>(
                                <Link to={`/detailview/${list.id}`}>
                                    <li>
                                        <div><img src={`../${list.imgsrc}`} alt='imgli'/></div>
                                        <p id='li_p'>{list.actor}</p>
                                        <p id='li_p2'>{list.role}</p>    
                                    </li>
                                </Link>
                                ))}
                        </ul>
                    </form>
                  
                    <ul id="header_ul">
                        <li>
                            <ul id='one' className="li_flex" onClick={OpenUl}>
                                <li>
                                    <h2>Batman Begins</h2>
                                    <ul id="fir_ul">
                                        <li onClick={CloseSitemap} className='fir_li'><Link to="/first">characters</Link></li>
                                        <li onClick={CloseSitemap} ><Link to="/goods1">goods</Link></li>
                                    </ul>
                                </li>
                                <li className='dp'><div id="d1" className='down'>
                                    <img src="../img/down.png" alt="down"/>
                                    </div></li>  
                            </ul>
                        </li>
                        <li>
                            <ul id='two' className="li_flex" onClick={OpenUl2}>
                                <li>
                                    <h2>The Dark Knight</h2>
                                    <ul id="fir_ul">
                                        <li onClick={CloseSitemap}  className='fir_li'><Link to="/second">characters</Link></li>
                                        <li onClick={CloseSitemap} ><Link to="/goods2">goods</Link></li>
                                    </ul>
                                </li>
                                <li className='dp'><div id='d2' className='down'>
                                    <img src="../img/down.png" alt="down"/>
                                    </div></li>   
                            </ul>
                        </li>
                        <li>
                            <ul id='three' className="li_flex la_li" onClick={OpenUl3}>
                                <li>
                                    <h2>The Dark Knight Rises</h2>
                                    <ul id="fir_ul">
                                        <li onClick={CloseSitemap}  className='fir_li'><Link to="/third">characters</Link></li>
                                        <li onClick={CloseSitemap} ><Link to="/goods3">goods</Link></li>
                                    </ul>
                                </li>
                                <li className='dp'><div id='d3' className='down'>
                                    <img src="../img/down.png" alt="down"/>
                                    </div></li>   
                            </ul>
                        </li>

                    </ul>
                    <ul>

                    </ul>
                </div>
                <div id="header_footer">
                    <div id="right_footer">
                        <p>JOIN THE CONVERSATION</p>
                        <ul id='icon_flex'>
                            {/* eslint-disable-next-line */}
                            <li><a href="#"><img src='../img/facebook.png' alt=''/></a></li>
                            {/* eslint-disable-next-line */}
                            <li><a href="#"><img src='../img/instagram.png' alt=''/></a></li>
                            {/* eslint-disable-next-line */}
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