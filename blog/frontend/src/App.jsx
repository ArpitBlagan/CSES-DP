import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import Post from './component/Post';
import Query from './component/Query';
import Forgot from './component/Forgot';
import NewPassword from './component/NewPassword';
import Detail from './component/Detail';
import { Logged} from './context/Logged';
function App() {
  return (
  <Logged>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<Detail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/query" element={<Query/>} />
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/resetPassword/:id" element={<NewPassword/>} />
      </Routes>
  </Logged>
    
  )
}

export default App
