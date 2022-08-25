import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config/contansts';
import './EditGoods.css'

const CreateGoods = () => {
    const navigate = useNavigate(); // 리다이렉션
    const [ formData, setFormData ] = useState({
        c_proimgsrc: "",
        c_proname: "",
        c_prodescript: "",
        c_price: "",
        c_part: "",
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const onChangeImage = (e) => {
        const { name } = e.target;
        const imageFormData = new FormData();
        imageFormData.append(name, e.target.files[0]);
        axios.post(`${API_URL}/upload`, imageFormData, {
            Headers: {'content-type':'multipart/form-data'},
        }).then(response=>{
            // setUploadImg(response.data.imageUrl);
            setFormData({
                ...formData,
                c_proimgsrc: response.data.imageUrl
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }
    // 폼 submit 이벤트
    const onSubmit = (e) => {
        if(window.confirm("등록하시겠습니까?")){
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
                insertGoods();
            }
            else {
                alert("모든 기입란에 기입해주세요");
            }
        }else{
            alert("등록이 취소되었습니다.");
        }
    }
    function insertGoods(){
        axios.post(`${API_URL}/insert`,formData)
        .then((result)=>{
            console.log(result);
            navigate(`/goods${formData.c_part}`); // 리다이렉션 추가
        })
        .catch(e=>{
            console.log(e);
        })
    }
    const fake = document.querySelector("#fake");
    function disa(){
        const real = document.querySelector('#real');
        real.style.opacity = 1;
        fake.style.opacity = 0;
    }
    return (
        <div id="editgoods">
            <div id="back">
            </div>
            <form onSubmit={onSubmit}> 
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={2}>
                                Insert Goods
                            </th>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td id='imgimgimg'>
                                <div id="editimg">
                                    {
                                        formData.c_proimgsrc && <img src={`${API_URL}/upload/${formData.c_proimgsrc}`} alt="" className='imgview'/>
                                    }
                                </div>
                                <p id="qqq">    
                                    <span id='fakebox'>파일 선택 </span> 
                                    {/* <span id='fake'>{imgname}</span> */}
                                    <input id='real' name="c_proimgsrc" type="file" onClick={disa} onChange={onChangeImage}/>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>
                                <input name="c_proname" type="text" value={formData.c_proname} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>
                            <input name="c_prodescript" type="text" value={formData.c_prodescript} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>price</td>
                            <td>
                                <input name="c_price" type="text" value={formData.c_price} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td id='radiostyle'>series</td>
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
                        <tr>
                            <td colSpan={2} id="btns">
                                <button type="submit">submit</button>
                                <button type="reset">deny</button>   
                            </td> 
                        </tr>   
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default CreateGoods;