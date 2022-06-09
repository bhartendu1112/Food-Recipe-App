import React from 'react';
import "./style.css";

import { Link } from 'react-router-dom';


function Header  ()  {
 
  const removeToken = () => {
    localStorage.removeItem('access_token');
  }

  return (
    <div className='header-container'>
        <div className='header'> 
          <Link to="/" style={{ textDecoration: 'none' }}><div className='header-logo'>
                Recipe Book
            </div></Link>
            <div className='icon'>
                <ul className='navigation'>
                    <Link to="/login"><li onClick={removeToken}>Home</li></Link>
                    <Link to="/login"><li onClick={removeToken}>Logout</li></Link>
              
                </ul>
            </div>

        </div>
    </div>
  )
}

export default Header;

