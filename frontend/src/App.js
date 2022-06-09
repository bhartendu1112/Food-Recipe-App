import React,{useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dishes from './component/dishes/dishes';
import Home from './component/home/home';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import Footer from './component/footer/footer';
import Header from "./component/header/header";
import EditForm from "./component/editForm/editForm";

function App() {
  useEffect(()=>{
    localStorage.removeItem('access_token');
    },[])

  const [storeID, setStoreID] = useState("")

  const setID = (id) => {
    setStoreID(id)
  }


  return (
      <div className="App">
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/dishes" element={<Dishes gettingID={setID}/>} />
            <Route exact path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/editDish' element={<EditForm sendID={storeID}/>}/>
          </Routes>
        <Footer/>
        </BrowserRouter>
      </div>
  );
}

export default App;