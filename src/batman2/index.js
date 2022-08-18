import React, { useEffect } from 'react';
import DarknightComponent from './darknight';
import { useSelector, useDispatch } from 'react-redux';
import { getSecondCharacters } from '../module/characters';


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
const SecondPage = () => {
    const { data:characters, loading, error } = useSelector(state => state.characters);
    const dispatch = useDispatch();
    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(()=>{
        dispatch(getSecondCharacters(dispatch));
    },[dispatch]);
    // const introText = document.querySelectorAll(".titlelogo span");
    // useEffect(()=>{
    //     let timer = 100;
    //     introText.forEach((item) => {
    //       item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
    //     });
    //   },[introText])
    if(loading)  return <div className="spinner_bg"><div className="sk-folding-cube">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
  </div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!characters) return <div>로딩중입니다.</div>
    return (
        <div>
            <div id="back">
            </div>
            <div className='titlelogo'>
                <h1>
                    <span className='logo1'>T</span>
                    <span className='logo2'>h</span>
                    <span className='logo3'>e</span>
                    <span className='logo4'> </span>
                    <span className='logo5'>D</span>
                    <span className='logo6'>a</span>
                    <span className='logo7'>r</span>
                    <span className='logo8'>k</span>
                    <span className='logo9'> </span>
                    <span className='logo10'>K</span>
                    <span className='logo11'>n</span>
                    <span className='logo12'>i</span>
                    <span className='logo13'>g</span>
                    <span className='logo14'>h</span>
                    <span className='logo15'>t</span>
                </h1>
            </div>
            <div id="whole" className='www' onMouseUp={isMoveUp} onMouseDown={isMoveDown} onMouseMove={onMouseMove}>
                <ul>
                    {characters.map(character=>(
                        <DarknightComponent key={character.id} character={character}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SecondPage;