import { Route, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './batman1/begins';
import SecondPage from './batman2/darknight';
import ThirdPage from './batman3/darknightlises';
import Header from './components/Header';
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
      </Routes>
    </div>
  );
}

export default App;
