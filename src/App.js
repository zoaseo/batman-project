import { Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './batman1';
import SecondPage from './batman2';
import ThirdPage from './batman3';
import DetailCharacter from './components/DetailCharacter';
import Header from './components/Header';
import MemberJoin from './components/MemberJoin';
import MemberLogin from './components/MemberLogin';
import Goods1Page from './goods1';
import Goods2Page from './goods2';
import Goods3Page from './goods3';
import Mainpage from './main';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Mainpage/>}/>
        <Route path="/first" element={<FirstPage/>}/>
        <Route path="/second" element={<SecondPage/>}/>
        <Route path="/third" element={<ThirdPage/>}/>
        <Route path="/login" element={<MemberLogin/>}/>
        <Route path="/join" element={<MemberJoin/>}/>
        <Route path="/detail" element={<DetailCharacter/>}/>
        <Route path="/detailview/:id" element={<DetailCharacter/>}/>
        <Route path="/goods1" element={<Goods1Page/>}/>
        <Route path="/goods2" element={<Goods2Page/>}/>
        <Route path="/goods3" element={<Goods3Page/>}/>
      </Routes>
    </div>
  );
}

export default App;
