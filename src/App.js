import { Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './batman1';
import SecondPage from './batman2';
import ThirdPage from './batman3';
import DetailCharacter from './components/DetailCharacter';
import DetailGoods from './components/DetailGoods';
import EditGoods from './components/EditGoods';
import Header from './components/Header';
import CreateGoods from './components/CreateGoods';
import MemberJoin from './components/MemberJoin';
import MemberLogin from './components/MemberLogin';
import MyPage from './components/MyPage';
import Goods1Page from './goods1';
import Goods2Page from './goods2';
import Goods3Page from './goods3';
import Mainpage from './main';
import { useEffect } from 'react';
import { setLogin } from './module/logincheck';
import { getCookie } from './util/cookie';
import { useDispatch } from 'react-redux';
import EditMyPage from './components/EditMyPage';


function App() {

  const dispatch = useDispatch();
  const uname = getCookie('userName');
  useEffect(()=>{
    if(uname){
      dispatch(setLogin())
    }
  },[])
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/first" element={<FirstPage/>}/>
        <Route path="/second" element={<SecondPage/>}/>
        <Route path="/third" element={<ThirdPage/>}/>
        {/* <Route path="/login" element={<MemberLogin/>}/> */}
        <Route path="/login" element={<MemberLogin/>}/>
        {/* <Route path="/join" element={<MemberJoin/>}/> */}
        <Route path="/join" element={<MemberJoin/>}/>
        <Route path="/detail" element={<DetailCharacter/>}/>
        <Route path="/detailview/:id" element={<DetailCharacter/>}/>
        <Route path="/goods1" element={<Goods1Page/>}/>
        <Route path="/goods2" element={<Goods2Page/>}/>
        <Route path="/goods3" element={<Goods3Page/>}/>
        <Route path="/detailview2/:id" element={<DetailGoods/>}/>
        <Route path="/mypage/:idid" element={<MyPage/>}/>
        <Route path="/editgoods/:id" element={<EditGoods/>}/>
        <Route path="/insert" element={<CreateGoods/>}/>
        <Route path="/editmypage/:id" element={<EditMyPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
