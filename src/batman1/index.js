import React, { useEffect }  from 'react';
import BeginsComponent from './begins';
import { useSelector, useDispatch } from 'react-redux';
import { getFirstCharacters } from '../module/characters';

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
  
const FirstPage = () => {
    const { data:characters, loading, error } = useSelector(state => state.characters);
    const dispatch = useDispatch();
    // const introText = document.querySelectorAll(".titlelogo span");
    // useEffect(()=>{
    //     let timer = 100;
    //     introText.forEach((item) => {
    //       item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
    //     });
    //   },[introText])
    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(()=>{
        dispatch(getFirstCharacters(dispatch));
    },[dispatch]);

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
                    <span className='logo1'>B</span>
                    <span className='logo2'>a</span>
                    <span className='logo3'>t</span>
                    <span className='logo4'>m</span>
                    <span className='logo5'>a</span>
                    <span className='logo6'>n</span>
                    <span className='logo7'> </span>
                    <span className='logo8'>B</span>
                    <span className='logo9'>e</span>
                    <span className='logo10'>g</span>
                    <span className='logo11'>i</span>
                    <span className='logo12'>n</span>
                    <span className='logo13'>s</span>
                </h1>
            </div>
            <div id="whole" className='www' onMouseUp={isMoveUp} onMouseDown={isMoveDown} onMouseMove={onMouseMove}>
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