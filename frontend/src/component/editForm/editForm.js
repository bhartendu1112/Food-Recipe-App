import React, { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function EditForm({sendID}) {
  
  const initialValues = { dish_name: "", recipe: "" };
  const [dish, setDish] = useState(initialValues);

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name] : e.target.value})
  };

  const editDish = async (data) => {
    await axios.put(`http://localhost:5000/api/dish/${sendID}`, dish)
  }
  

  const onSubmit = async (e) => {
    e.preventDefault();
    editDish()
    setDish(initialValues)
  };

  return (
    <div onSubmit={onSubmit}>
       <div className="form">
        <form className='form-login'> 
        <div className='form-inner'>
         
          <div className='form-group'>
            <label htmlFor='Dishname'>Dish Name:</label>
            <input type="text" name="dish_name" id="dish_name" value={dish.dish_name} onChange={handleChange}/>
            {/* {noEmail()} */}
          </div>
          <div className='form-group'>
            <label htmlFor='recipe'>Recipe:</label>
            <input type="text" name="recipe" id="recipe" value={dish.recipe} onChange={handleChange }/>
            {/* {noPassword()} */}
          </div> 
            <Link to="/dishes"><input className='create_dish' type="submit" onClick={()=> editDish()} value="Update Dish" /></Link>
        </div>
        </form>
   

    </div>

    </div>
  )
}

export default EditForm
