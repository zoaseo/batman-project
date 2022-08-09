import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Header.css';
import { getCookie, removeCookie } from '../util/cookie';
import { setLogout } from '../module/logincheck';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../config/contansts.js';
import useAsync from '../customHook/useAsync';

const Header = () => {
    const Navigate = useNavigate();
    function goHome() {
        Navigate('/');
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
        site_map.style.left = '-550px';
        site_map.style.zIndex = '1';
        const ham = document.querySelector('#ham');
        ham.style.opacity = '1';
    }
    const d1 = document.querySelector("#d1");
    const d2 = document.querySelector("#d2");
    const d3 = document.querySelector("#d3");
    function OpenUl () {
        const one = document.querySelector('#one');
        one.classList.toggle('ontoggle');
        d1.classList.toggle("go");
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
    }
    function OpenUl2 () {
        const two = document.querySelector('#two');
        two.classList.toggle('ontoggle');
        d2.classList.toggle("go");
        const hul = document.querySelector("#header_ul");
        hul.style.top = '200px';
    }
    function OpenUl3 () {
        const three = document.querySelector('#three');
        three.classList.toggle('ontoggle');
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
    useEffect(()=>{},[isLogin]);
    // const onChangeSearch = async (e) => {

    //     const input_value = e.target.value;
    //     console.log(input_value);
    //     const response = await axios.get(`${API_URL}/search/${input_value}`);
    //     console.log(response.data);
    //     return response.data;
    // }
    const [ formData, setFormData ] = useState({
        c_imgsrc: "",
        c_actor: "",
        c_role: ""
    })
    // async function getGoods(input_value) {
    //     const response = await axios.get(`${API_URL}/search/${input_value}`);
    //     return response.data
    // }
    const onChangeSearch = async (e) =>{ 
        const input_value = e.target.value;
        console.log(input_value);
        const response = await axios.get(`${API_URL}/search/${input_value}`);
        console.log(response)
        console.log(response.data[0].imgsrc)
        const {imgsrc} = response.data;
        console.log(imgsrc)
        // const [state] = useAsync(getGoods(input_value), [input_value])
        // const { loading, data, error } = state;
        // useEffect(()=>{
        //     setFormData({
        //     ...formData,
        //     c_actor: data?data.actor:""
        //     })
        // },[data])
        // console.log(formData)
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
                            {uname === 'admin' ? <li><Link to="/insert">insert</Link></li> : ''}
                            {isLogin === false ? <li><Link to="/login">login</Link></li> : <>{ uname === 'admin' ? <><li>{uname}</li><li id="pointer" onClick={()=>{goHome(); logoutClick();}}>logout</li></> : <><li>welcome {uname}</li><li id="pointer" onClick={()=>{goHome(); logoutClick();}}>logout</li></>}</>}
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
                        <input name='search' id='search' onClick={()=>{
                            const hul = document.querySelector("#header_ul");
                            hul.style.top = '500px';
                        }} onKeyUp={onChangeSearch}/>
                        <ul>
                            <li>
                                {/* {response.data} */}
                                
                            </li>
                        </ul>
                    </form>
                  
                    <ul id="header_ul">
                        <li>
                            <ul id='one' className="li_flex">
                                <li>
                                    <h2>batman begins</h2>
                                    <ul id="fir_ul">
                                        <li onClick={CloseSitemap} className='fir_li'><Link to="/first">characters</Link></li>
                                        <li onClick={CloseSitemap} ><Link to="/goods1">goods</Link></li>
                                    </ul>
                                </li>
                                <li className='dp'><div id="d1" className='down' onClick={OpenUl}>
                                    <img src="../img/down.png" alt="down"/>
                                    </div></li>  
                            </ul>
                        </li>
                        <li>
                            <ul id='two' className="li_flex">
                                <li>
                                    <h2>The Dark Knight</h2>
                                    <ul id="fir_ul">
                                        <li onClick={CloseSitemap}  className='fir_li'><Link to="/second">characters</Link></li>
                                        <li onClick={CloseSitemap} ><Link to="/goods2">goods</Link></li>
                                    </ul>
                                </li>
                                <li className='dp'><div id='d2' className='down' onClick={OpenUl2}>
                                    <img src="../img/down.png" alt="down"/>
                                    </div></li>   
                            </ul>
                        </li>
                        <li>
                            <ul id='three' className="li_flex la_li">
                                <li>
                                    <h2>The Dark Knight Rises</h2>
                                    <ul id="fir_ul">
                                        <li onClick={CloseSitemap}  className='fir_li'><Link to="/third">characters</Link></li>
                                        <li onClick={CloseSitemap} ><Link to="/goods3">goods</Link></li>
                                    </ul>
                                </li>
                                <li className='dp'><div id='d3' className='down' onClick={OpenUl3}>
                                    <img src="../img/down.png" alt="down"/>
                                    </div></li>   
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