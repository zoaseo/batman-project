import React, { useEffect }  from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts.js';
import BeginsComponent from './begins';
import { useSelector, useDispatch } from 'react-redux';
import { getFirstCharacters } from '../module/characters';

// async function getCharacters(){
//     const response = await axios.get(`${API_URL}/first`);
//     return response.data;
// }
  function onMouseMove(e) {
    const www = document.querySelector(".www");
    console.log(`client: (${e.clientX}, ${e.clientY})`);
    console.log(`page: (${e.pageX}, ${e.pageY})`);
    console.log(`offset: (${e.offsetX}, ${e.offsetY})`);
    console.log('------------------------------------');
    const mousex = e.clientX - 950;
    const mousey = e.clientY - 550;
    console.log(mousex)
    www.style.left = mousex + 'px';
    www.style.top = mousey + 'px';
  }
  window.onmousewheel = function(e) {
    const www = document.querySelector("#whole");
    console.dir(e);
    if(e.wheelDelta === -120){
      console.log('wheel down');
    // console.log(www.offsetWidth)
    //   ++www.style.width; 
    } else {
      console.log('wheel up');
    }
  }
const FirstPage = () => {
    const { data:characters, loading, error } = useSelector(state => state.characters);
    const dispatch = useDispatch();
    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(()=>{
        dispatch(getFirstCharacters(dispatch));
    },[dispatch]);
    const introText = document.querySelectorAll(".titlelogo span");
    useEffect(()=>{
        let timer = 100;
        introText.forEach((item) => {
          item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
        });
      },[introText])
    // const [state] = useAsync(getCharacters, [])
    // const { loading, data: characters, error } = state;
    if(loading) return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!characters) return <div>로딩중입니다.</div>

    return (
        <div>
            <div id="back">
            </div>
            <div className='titlelogo'>
                <h1>
                    <span>B</span>
                    <span>a</span>
                    <span>t</span>
                    <span>m</span>
                    <span>a</span>
                    <span>n</span>
                    <span> </span>
                    <span>B</span>
                    <span>e</span>
                    <span>g</span>
                    <span>i</span>
                    <span>n</span>
                    <span>s</span>
                </h1>
            </div>
            <div id="whole" className='www' onMouseDown={onMouseMove}>
                <ul>
                    {characters.map(character=>(
                        <BeginsComponent key={character.id} character={character}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FirstPage;