import React, { useEffect } from 'react';
import Goods1Component from './goods';
import { useSelector, useDispatch } from 'react-redux';
import { getFirstGoods } from '../module/goods';

// async function getGoods(){
//     const response = await axios.get(`${API_URL}/goods1`);
//     return response.data;
// }
const Goods1Page = () => {
    const { data:goods, loading, error } = useSelector(state => state.goods);
    const dispatch = useDispatch();
    // 컴포넌트 마운트 후 고객 목록 요청
    useEffect(()=>{
        dispatch(getFirstGoods(dispatch));
    },[dispatch]);
    // let introText = document.querySelectorAll(".titlelogo span");
    // useEffect(()=>{
    //     console.log("안녕안녕");
    //     let timer = 100;
    //     introText.forEach((item) => {
    //       item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
    //     });
        
    //   },[introText])
    // const [state] = useAsync(getGoods, [])
    // const { loading, data: goods, error } = state;
    if(loading)  return <div className="spinner_bg"><div className='spinner'><div className="sk-folding-cube">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
    </div>
  </div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!goods) return <div>로딩중입니다.</div>
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
            <div id="whole2">
                <ul>
                    {goods.map(goods=>(
                        <Goods1Component key={goods.id} goods={goods}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Goods1Page;