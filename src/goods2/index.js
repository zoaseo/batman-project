import React, { useEffect } from 'react';
import Goods2Component from './goods2';
import { useSelector, useDispatch } from 'react-redux';
import { getSecondGoods } from '../module/goods';

// async function getGoods(){
//     const response = await axios.get(`${API_URL}/goods2`);
//     return response.data;
// }

const Goods2Page = () => {
    const { data:goods, loading, error } = useSelector(state => state.goods);
    const dispatch = useDispatch();
    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(()=>{
        dispatch(getSecondGoods(dispatch));
    },[dispatch]);
    // const introText = document.querySelectorAll(".titlelogo span");
    // useEffect(()=>{
    //     let timer = 100;
    //     introText.forEach((item) => {
    //       item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
    //     });
    //   },[introText])
    // const [state] = useAsync(getGoods, [])
    // const { loading, data: goods, error } = state;
    if(loading)  return <div className="spinner_bg"><div className="sk-folding-cube">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
  </div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!goods) return <div>로딩중입니다.</div>
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
            <div id="whole2">
                <ul>
                    {goods.map(goods=>(
                        <Goods2Component key={goods.id} goods={goods}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Goods2Page;