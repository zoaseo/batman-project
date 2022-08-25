import React from 'react';
import './main.css';

// function Titlefly () {
//     const fir_ti = document.querySelector('#choice ul li:nth-child(1)');
//     const fir_ti2 = document.querySelector('#choice ul li:nth-child(2)');
//     const fir_ti3 = document.querySelector('#choice ul li:nth-child(3)');
//     fir_ti.style.top='-480px';
//     fir_ti2.style.top='0px';
//     fir_ti3.style.top='150px';
//     const go = document.querySelector('#go');
//     const go2 = document.querySelector('#go2');
//     const go3 = document.querySelector('#go3');
//     go.style.left='50%';
//     go.style.opacity='0.5';
//     go2.style.opacity='0';
//     go3.style.opacity='0';
//     go2.style.left = '110%';
//     go3.style.top = '-30%';
// }
// function Titlefly2 () {
//     const fir_ti = document.querySelector('#choice ul li:nth-child(1)');
//     const fir_ti2 = document.querySelector('#choice ul li:nth-child(2)');
//     const fir_ti3 = document.querySelector('#choice ul li:nth-child(3)');
//     fir_ti2.style.top='-480px';
//     fir_ti.style.top='-150px';
//     fir_ti3.style.top='150px';
//     const go = document.querySelector('#go');
//     const go2 = document.querySelector('#go2');
//     const go3 = document.querySelector('#go3');
//     go2.style.left='50%';
//     go2.style.opacity='0.5';
//     go.style.opacity='0';
//     go3.style.opacity='0';
//     go.style.left = '-10%';
//     go3.style.top = '-30%';
// }
// function Titlefly3 () {
//     const fir_ti = document.querySelector('#choice ul li:nth-child(1)');
//     const fir_ti2 = document.querySelector('#choice ul li:nth-child(2)');
//     const fir_ti3 = document.querySelector('#choice ul li:nth-child(3)');
//     fir_ti3.style.top='-480px';
//     fir_ti.style.top='-150px';
//     fir_ti2.style.top='0px';
//     const go = document.querySelector('#go');
//     const go2 = document.querySelector('#go2');
//     const go3 = document.querySelector('#go3');
//     go3.style.top='150px';
//     go3.style.opacity='0.5';
//     go.style.opacity='0';
//     go2.style.opacity='0';
//     go.style.left = '-10%';
//     go2.style.left = '110%';
// }
const Mainpage = () => {
    return (
        <div id='wrap'>
            <div id="back">
            </div>
            <div className='real_bat'><img src='/img/realbat.png' alt='real'/></div>
            <ul className='rain_gif'>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
                <li><img src ='/img/rain.gif' alt='rain'/></li>
            </ul>
            {/* <div id="choice">
                <button id="go" className='gostyle'>
                    <span><Link to="/first">click</Link></span>
                    <img src="/img/go.png" alt="go"/>
                </button>
                <button id="go2" className='gostyle'>
                    <span><Link to="/second">click</Link></span>
                    <img src="/img/go.png" alt="go2"/>
                </button>
                <button id="go3" className='gostyle'>
                    <span><Link to="/third">click</Link></span>
                    <img src="/img/go.png" alt="go3"/>
                </button>
                <ul id="logologo">
                    <li onClick={Titlefly}>Batman Begins<br/>2005</li>
                    <li onClick={Titlefly2}>The Dark Knight<br/>2008</li>
                    <li onClick={Titlefly3}>The Dark Knight Rises<br/>2012</li>
                </ul>
            </div> */}
        </div>
    );
};

export default Mainpage;