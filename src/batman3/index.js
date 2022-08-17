import React, { useEffect} from 'react';
import DarknightLisesComponent from './darknightlises';
import { useSelector, useDispatch } from 'react-redux';
import { getThirdCharacters } from '../module/characters';

// async function getCharacters(){
//     const response = await axios.get(`${API_URL}/third`);
//     return response.data;
// }
let move = false;
function isMoveDown(){
  move = true;
}
function isMoveUp(){
  move = false;
}
function onMouseMove(e) {
  if(move){
    const www = document.querySelector(".www");
    console.log(`client: (${e.clientX}, ${e.clientY})`);
    console.log(`page: (${e.pageX}, ${e.pageY})`);
    console.log(`offset: (${e.offsetX}, ${e.offsetY})`);
    console.log('------------------------------------');
    const mousex = e.clientX - 900;
    const mousey = e.clientY - 500;
    console.log(mousex)
    www.style.left = mousex + 'px';
    www.style.top = mousey + 'px';
  }
}
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
    if(loading)  return <div className="spinner_bg"><div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div></div>
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
            <div id="whole" className='www' onMouseUp={isMoveUp} onMouseDown={isMoveDown} onMouseMove={onMouseMove}>
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