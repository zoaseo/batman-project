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
    const introText = document.querySelectorAll(".titlelogo span");
    useEffect(()=>{
        let timer = 100;
        introText.forEach((item) => {
          item.style.animation = `fade 500ms ${(timer += 150)}ms forwards`;
        });
      },[introText])
    // const [state] = useAsync(getGoods, [])
    // const { loading, data: goods, error } = state;
    if(loading)  return <div className="spinner_bg"><div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!goods) return <div>로딩중입니다.</div>
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