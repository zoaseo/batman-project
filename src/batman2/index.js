import React from 'react';
import useAsync from '../customHook/useAsync';
import axios from 'axios';
import { API_URL } from '../config/contansts.js';
import DarknightComponent from './darknight';

async function getCharacters(){
    const response = await axios.get(`${API_URL}/second`);
    return response.data;
}
const SecondPage = () => {
    const [state] = useAsync(getCharacters, [])
    const { loading, data: characters, error } = state;
    if(loading)
    return <div className="spinner_bg"><div className="spinner"><div className="cube1"></div><div className="cube2"></div></div></div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!characters) return <div>로딩중입니다.</div>
    return (
        <div>
            <div id="back">
            </div>
            <div className='titlelogo'>
                <h1>The Dark Knight<br/>2008</h1>
            </div>
            <div id="whole">
                <ul>
                    {characters.map(character=>(
                        <DarknightComponent key={character.id} character={character}/>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SecondPage;