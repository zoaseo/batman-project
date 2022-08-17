import React from 'react';
import axios from 'axios';
import useAsync from '../customHook/useAsync';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './DetailCharacter.css';

async function getCharacters(id){
    const response = await axios.get(`${API_URL}/detailview/${id}`);
    return response.data;
}  

const DetailCharacter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ state ] = useAsync(()=>getCharacters(id),[id]);
    const { loading, data:character, error } = state;

    // 캐릭터 삭제
    const onDelete = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.delete(`${API_URL}/delCharacter/${id}`)
            .then(result=>{
                console.log("삭제되었습니다.");
                navigate("/"); // 리다이렉션 추가
            })
            .catch(e=>{
                console.log(e);
            })
        }else{
            alert("삭제가 취소되었습니다");
        }

    }

    if(loading)  return <div className="spinner_bg"><div class="sk-folding-cube">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
  </div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!character) return null;
    return (
        <div>
            <div id="back">
            </div>
            <div id="detail_character">
                <div id='btns'>
                    <button>수정</button>
                    <button onClick={onDelete}>삭제</button>
                </div>
                <div id="left_detail">
                    <span id="span_actor">{character.actor}</span>
                    <div id="span_role">{character.role}</div>
                    <div id="div_description">{character.description}</div>
                </div>
                <div id="right_detail">
                    <div id="detail_img"><img src={`../${character.imgsrc2}`} alt="" /></div>
                </div>
            </div>
        </div>
    );
};

export default DetailCharacter;