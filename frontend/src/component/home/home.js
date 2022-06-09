import React from 'react'
import { Link } from 'react-router-dom';
import "./style.css";


function Home () {


  return (
    <div className='div'>
        <h1 className='head1'> Welcome </h1>
            <br/> 
        <Link to="/login"><h1 className='head2'> Click to Login </h1></Link>
    </div>
  )
}

export default Home; 