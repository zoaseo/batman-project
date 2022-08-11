import React, { useEffect} from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
import { API_URL } from '../config/contansts.js';
import DarknightLisesComponent from './darknightlises';
import { useSelector, useDispatch } from 'react-redux';
import { getThirdCharacters } from '../module/characters';

// async function getCharacters(){
//     const response = await axios.get(`${API_URL}/third`);
//     return response.data;
// }
const ThirdPage = () => {
    const { data:characters, loading, error } = useSelector(state => state.characters);
    const dispatch = useDispatch();
    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(()=>{
        dispatch(getThirdCharacters(dispatch));
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
                    <span>T</span>
                    <span>h</span>
                    <span>e</span>
                    <span> </span>
                    <span>D</span>
                    <span>a</span>
                    <span>r</span>
                    <span>k</span>
                    <span> </span>
                    <span>K</span>
                    <span>n</span>
                    <span>i</span>
                    <span>g</span>
                    <span>h</span>
                    <span>t</span>
                    <span> </span>
                    <span>R</span>
                    <span>i</span>
                    <span>s</span>
                    <span>e</span>
                    <span>s</span>
                </h1>
            </div>
            <div id="whole">
                <ul>
                    {characters.map(character=>(
                        <DarknightLisesComponent key={character.id} character={character}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ThirdPage;