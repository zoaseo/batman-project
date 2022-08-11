import axios from "axios";
import { API_URL } from "../config/contansts";

// 초기 상태 선언
const initialState = {
    data: null,
    loading: false,
    error: null
}

// 액션 타입
export const GET_CHARACTER = "GET_CHARACTER";
export const GET_CHARACTER_SUCCESS = "GET_CHARACTER_SUCCESS";
export const GET_CHARACTER_ERROR = "GET_CHARACTER_ERROR";


// 액션 생성 함수 선언
export const getFirstCharacters = () => async dispatch => {
    dispatch({ type: GET_CHARACTER}) // 요청시작
    try{
        const response = await axios.get(`${API_URL}/first`);
        const characterdata = response.data;
        dispatch({ type: GET_CHARACTER_SUCCESS, payload: characterdata})
    }
    catch(e) {
        dispatch({ type: GET_CHARACTER_ERROR, payload: e})
    }
}
export const getSecondCharacters = () => async dispatch => {
    dispatch({ type: GET_CHARACTER}) // 요청시작
    try{
        const response = await axios.get(`${API_URL}/second`);
        const characterdata = response.data;
        dispatch({ type: GET_CHARACTER_SUCCESS, payload: characterdata})
    }
    catch(e) {
        dispatch({ type: GET_CHARACTER_ERROR, payload: e})
    }
}
export const getThirdCharacters = () => async dispatch => {
    dispatch({ type: GET_CHARACTER}) // 요청시작
    try{
        const response = await axios.get(`${API_URL}/third`);
        const characterdata = response.data;
        dispatch({ type: GET_CHARACTER_SUCCESS, payload: characterdata})
    }
    catch(e) {
        dispatch({ type: GET_CHARACTER_ERROR, payload: e})
    }
}

// 리듀서 선언
export default function characters(state=initialState, action){
    switch(action.type){
        case GET_CHARACTER:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_CHARACTER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case GET_CHARACTER_ERROR:
            return {
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state;
    }
}