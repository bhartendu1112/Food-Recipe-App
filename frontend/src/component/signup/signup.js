import React, { useState } from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


function Signup () {

  const initialValues = { name: "", email: "", password: "" };
  const [user, setUser] = useState(initialValues);
 

  const {name, email, password} = user;

  const noName = () => {if(name === ""){    
    return <><span className='validation'>Please Enter Your Name</span></>;
  }};

  
  const noEmail = () => {if(email === "" ){    
    return <><span className='validation'>Please Enter Your Email</span></>;
  }};

  
  const noPassword = () => {if(password === "" ){    
    return <><span className='validation'>Please Enter Your Password</span></>;
  }};

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name] : e.target.value})
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/register", user)
    .then(res => {
      localStorage.setItem('access_token', res.data.token)})
    .catch((error) => {
      console.log(error)
    });    
    setUser(initialValues)
   
  };


  const userToken = localStorage.getItem("access_token")

  const userSignup = () => {
    localStorage.removeItem('access_token');
  }

  const message = () => {if(userToken){    
    
    return <div> <p className='para' onClick={userSignup}> User account created. Please click to <Link to="/login">Login</Link></p></div>;

  }};

  return (
    <div className='mainContent' onSubmit={onSubmit}>
      <h1>CHECK YOUR RECIPES</h1>
      <form className='form-login'> 
        <div className='form-inner'>
          <h2>Register</h2>
          {message()}
          <br/>
       
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input type="name" name="name" id="name" value={user.name} onChange={handleChange }/>
            {noName()}
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type="email" name="email" id="email" value={user.email} onChange={handleChange }/>
            {noEmail()}
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type="password" name="password" id="password" value={user.password} onChange={handleChange }/>
            {noPassword()}
          </div> 
            <input className='signup' type="submit" value="SIGNUP" />      
            <p> or </p>            
            <Link to="/login"><input className='login' type="submit" value="LOGIN"/></Link>             
        </div>
      </form>
    </div>
  )
}

export default Signup; 