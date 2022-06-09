import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./style.css";
import axios from "axios";

function Login() {

  const initialValues = { email: "", password: ""};
  const [users, setUsers] = useState(initialValues);

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name] : e.target.value})
  };

  // useEffect(()=>{
  //   localStorage.removeItem('access_token');
  //   },[])
   

  const onSubmit = async(e) => {

    e.preventDefault();
    await axios.post("http://localhost:5000/api/login", users)
    .then(res => {
      localStorage.setItem('access_token', res.data.token)})
    .catch((error) => {
      console.log(error)
    });
    setUsers(initialValues)
   
  }
  const userToken = localStorage.getItem("access_token")
  if(userToken){
    return <Navigate to="/dishes"/>
  }

  const {email, password} = users;

  const noEmail = () => {if(email === "" ){    
    return <><span className='validation'>Please Enter Your Email</span></>;
  }};

  
  const noPassword = () => {if(password === "" ){    
    return <><span className='validation'>Please Enter Your Password</span></>;
  }};


  return (
    <div className='mainContent' onSubmit={onSubmit}>
      <h1>CHECK YOUR RECIPES</h1>
      <form className='form-login'> 
        <div className='form-inner'>
          <h2>Login</h2>
          <br/>
    
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type="email" name="email" id="email" value={users.email} onChange={handleChange }/>
            {noEmail()}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" id="password" value={users.password} onChange={handleChange}/>
            {noPassword()}
          </div> 
            <input className='login' type="submit" value="LOGIN" />
            <p> or </p>    
            <Link to="/signup"><input className='signup' type="submit" value="SIGNUP" /></Link>    
        </div>
      </form>
    </div>
  )
}

export default Login;