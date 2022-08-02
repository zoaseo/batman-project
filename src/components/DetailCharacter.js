import React from 'react';
// import axios from 'axios';
// import useAsync from '../customHook/useAsync';
import { Link } from 'react-router-dom';
// import { API_URL } from '../config/contansts';
import './DetailCharacter.css';
// import CounterContainer from './CounterContainer';
// import { useSelector, useDispatch  } from 'react-redux'
// import {  reset } from '../modules/counter';

// async function getConcerts(id){
//     const response = await axios.get(`${API_URL}/detailview/${id}`);
//     return response.data;
// }  

const DetailCharacter = () => {
    // const dispatch = useDispatch();
    // const onReset = () => dispatch(reset());
    // const { number } = useSelector(state => (state.counter));
    // console.log(number);
    // const { id } = useParams();
    // const navigate = useNavigate();
    // const idid = sessionStorage.getItem('loginId');
    // const [ goData, setGoData ] = useState({
    //     c_user_id: "",
    //     c_user_title: "",
    //     c_user_region: "",
    //     c_user_location: "",
    //     c_user_date: "",
    //     c_user_start: "",
    //     c_user_num: "",
    // })
    // const [ state ] = useAsync(()=>getConcerts(id),[id]);
    // const { loading, data:concert, error } = state;

    // useEffect(()=>{
    //     setGoData({
    //         c_user_id: idid,
    //         c_user_title: concert? concert.title : "",
    //         c_user_region: concert? concert.location : "",
    //         c_user_location: concert? concert.concert_place : "",
    //         c_user_date: concert? concert.concertdate : "",
    //         c_user_start: concert? concert.start_time : "",
    //         c_user_num: number
    //     })
    // // eslint-disable-next-line
    // },[concert, number])
    // useEffect(()=> {
    //     onReset();
    //     // eslint-disable-next-line
    // },[])

    // function addReserve(){
    //     if(window.confirm("예매하시겠습니까?") && idid){
    //         axios.put(`${API_URL}/addReservation`, goData)
    //         .then((result)=>{
    //             console.log(result);
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //         })
    //         navigate(`/mypage/${idid}`);
    //     } 
    //      else {
    //         if(idid) alert("예매가 취소되었습니다.");
    //         else alert('로그인 후 이용바랍니다.')
    //     }
    // }

    // // 콘서트 삭제
    // const onDelete = () => {
    //     if(window.confirm("정말 삭제하시겠습니까?")){
    //         axios.delete(`${API_URL}/delConcert/${id}`)
    //         .then(result=>{
    //             console.log("삭제되었습니다.");
    //             navigate("/"); // 리다이렉션 추가
    //         })
    //         .catch(e=>{
    //             console.log(e);
    //         })
    //     }else{
    //         alert("삭제가 취소되었습니다");
    //     }

    // }

    // if(loading)  return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    // if(error) return <div>에러가 발생했습니다.</div>
    // if(!concert) return null;
    return (
        <div>
            <div id="back">
            </div>
            <div id="detail_concert">
                <div id='btns'>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <div id="left_detail">
                    <div id="detail_img"><img src='../img/1.2.png' alt="" /></div>
                </div>
                <div id="right_detail">
                    <span id="span_actor">크리스찬 베일</span>
                    <div id="span_role">배트맨</div>
                    <div id="div_description">blablaaaaaaaaaaaa</div>
                </div>
            </div>
        </div>
    );
};

export default DetailCharacter;