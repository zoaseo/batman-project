import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import useAsync from '../customHook/useAsync';
import './EditGoods.css';

const EditGoods = () => {
    const navigate = useNavigate(); // 리다이렉션
    const { id } = useParams();
    const [ formData, setFormData ] = useState({
        c_proimgsrc: "",
        c_proname: "",
        c_prodescript: "",
        c_price: "",
        c_part: "",
    })
    async function getGoods(id){
        const response = await axios.get(`${API_URL}/detailview2/${id}`);
        return response.data;
    }  
    const [ state ] = useAsync(()=>getGoods(id),[id]);
    const { loading, data:goods, error } = state;
    useEffect(()=>{
        setFormData({
            c_proimgsrc: goods? goods.proimgsrc : "",
            c_proname: goods? goods.proname : "",
            c_prodescript: goods? goods.prodescript : "",
            c_price: goods? goods.price : "",
            c_part: goods? goods.part : "",
        })
    },[goods])

    console.log(formData.c_proimgsrc);
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // 폼 submit 이벤트
    const onSubmit = (e) => {
        if(window.confirm("정말 수정하시겠습니까?")){
            // form에 원래 연결된 이벤트를 제거
            e.preventDefault();
            // 가격이 숫자인지 체크
            if(isNaN(formData.c_price)){
                alert("가격은 숫자만 입력해주세요");
                setFormData({
                    ...formData,
                    c_price: "",
                })
            }
            // input에 값이 있는지 체크하고
            // 입력이 다되어있으면 post전송
            else if(formData.c_proimgsrc !== "" && formData.c_proname !== "" &&
            formData.c_prodescript !== "" && formData.c_price !== "" &&
            formData.c_part !== ""){
                updateGoods();
            }
            else {
                alert('모든 기입란에 기입해주세요');
            }
        }else{
            alert("수정이 취소되었습니다");
        }   
    }
    const onChangeImg = (e) => {
        const file = e.target.files[0];
        const imgsrc = "image/"+file.name;
        setFormData({
            ...formData,
            c_proimgsrc: imgsrc
        })
    }
    function updateGoods(){
        axios.put(`${API_URL}/editgoods/${id}`,formData)
        .then((result)=>{
            console.log(result);
            navigate(-1); // 리다이렉션 추가
        })
        .catch(e=>{
            console.log(e);
        })
    }
    const imgname = formData.c_proimgsrc.split('/')[1];

    if(loading) return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!goods) return null;

    return (
        <div id="editgoods">
            <div id="back">
            </div>
            <form onSubmit={onSubmit}> 
                <table>
                    <tbody>
                        <tr id='gone'>
                            <th colSpan={2}>
                                굿즈 정보 수정하기
                            </th>
                        </tr>
                        <tr>
                            <td>이미지등록</td>
                            <td id='imgimgimg'>
                                <img src={`../${formData.c_proimgsrc}`} alt="imgimg"/>
                                <p id="fff">    
                                    <span id='fakebox'>파일 선택 </span> 
                                    <span id='fake'>{imgname}</span>
                                    <input id='real' name="c_proimgsrc" type="file" onChange={onChangeImg}/>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>제품명</td>
                            <td>
                                <input name="c_proname" type="text" value={formData.c_proname} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>제품설명</td>
                            <td>
                            <input name="c_prodescript" type="text" value={formData.c_prodescript} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td>
                                <input name="c_price" type="text" value={formData.c_price} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>시리즈</td>
                                <p className='radios'>
                                Batman Begins
                                <input name="c_part" type="radio" value="1" onChange={onChange} 
                                checked={formData.c_part === "1" ? true : false}/>
                                </p>
                                <p className='radios'>
                                The Dark Knight
                                <input name="c_part" type="radio" value="2" onChange={onChange}
                                checked={formData.c_part === "2" ? true : false}/>
                                </p>
                                <p className='radios'>
                                The Dark Knight Rises
                                <input name="c_part" type="radio" value="3" onChange={onChange}
                                checked={formData.c_part === "3" ? true : false}/>
                                </p>
                        </tr>
                        <tr id="btns">
                            <td colSpan={2} id="btns">
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>   
                            </td> 
                        </tr>   
                    </tbody>   
                </table>  
            </form>
        </div>
    );
};

export default EditGoods;