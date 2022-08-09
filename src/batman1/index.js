import React, { useEffect }  from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { API_URL } from '../config/contansts.js';
import BeginsComponent from './begins';

async function getCharacters(){
    const response = await axios.get(`${API_URL}/first`);
    return response.data;
}

const FirstPage = () => {
    const introText = document.querySelectorAll(".titlelogo span");
    useEffect(()=>{
        let timer = 100;
        introText.forEach((item) => {
          item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
        });
      },[introText])
    const [state] = useAsync(getCharacters, [])
    const { loading, data: characters, error } = state;
    if(loading)
    return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
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
            <div id="whole">
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