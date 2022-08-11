import axios from "axios";
import { API_URL } from "../config/contansts";

// 초기 상태 선언
const initialState = {
    data: null,
    loading: false,
    error: null
}

// 액션 타입
export const GET_GOODS = "GET_GOODS";
export const GET_GOODS_SUCCESS = "GET_GOODS_SUCCESS";
export const GET_GOODS_ERROR = "GET_GOODS_ERROR";


// 액션 생성 함수 선언
export const getFirstGoods = () => async dispatch => {
    dispatch({ type: GET_GOODS}) // 요청시작
    try{
        const response = await axios.get(`${API_URL}/goods1`);
        const goodsdata = response.data;
        dispatch({ type: GET_GOODS_SUCCESS, payload: goodsdata})
    }
    catch(e) {
        dispatch({ type: GET_GOODS_ERROR, payload: e})
    }
}
export const getSecondGoods = () => async dispatch => {
    dispatch({ type: GET_GOODS}) // 요청시작
    try{
        const response = await axios.get(`${API_URL}/goods2`);
        const goodsdata = response.data;
        dispatch({ type: GET_GOODS_SUCCESS, payload: goodsdata})
    }
    catch(e) {
        dispatch({ type: GET_GOODS_ERROR, payload: e})
    }
}
export const getThirdGoods = () => async dispatch => {
    dispatch({ type: GET_GOODS}) // 요청시작
    try{
        const response = await axios.get(`${API_URL}/goods3`);
        const goodsdata = response.data;
        dispatch({ type: GET_GOODS_SUCCESS, payload: goodsdata})
    }
    catch(e) {
        dispatch({ type: GET_GOODS_ERROR, payload: e})
    }
}

// 리듀서 선언
export default function goods(state=initialState, action){
    switch(action.type){
        case GET_GOODS:
            return {
                loading: true,
                data: null,
                error: null
            }
        case GET_GOODS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case GET_GOODS_ERROR:
            return {
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state;
    }
}