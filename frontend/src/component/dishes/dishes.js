import React, { useState,useEffect } from 'react';
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Dishes({gettingID}) {

  const initialValues = { dish_name: "", recipe: "" };
  const [dish, setDish] = useState(initialValues);
  const [data, setData] = useState([]); 
   
  const getData = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/dishes`);
    setData(data);
  };  

  const delDish = async (data) => {
    await axios.delete(`http://localhost:5000/api/dish/${data._id}`)
    getData();
  }
  
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setDish({ ...dish, [e.target.name] : e.target.value})
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/newDish", dish)
    getData();
    setDish(initialValues)
   
  };

  const getID = (data) => {
    let saveID = data._id
    gettingID(saveID)
  }

 
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
            <input className='create_dish' type="submit" value="Create Dish" />
             
        </div>
      </form>
   

    </div>

    <table id="customers">
         <tr>
          <th>Dish Name</th>
          <th>Dish Recipe</th>

          <th> Delete </th>
          <th>Edit</th>

         </tr>
    
        {data && data.map((dishes, index)=>{
          return (
             
         <tr key={dishes._id}>
            <td>{dishes.dish_name}</td>
            <td>{dishes.recipe}</td>
            <td><button className='delete' onClick={()=>{delDish(data[index])}}> Delete </button></td>
            <td><Link to="/editDish"><button className='edit' onClick={()=>{getID(data[index])}}> Edit </button></Link></td>
         </tr>
        )
    })}
    </table>

   
    </div>
  )
}

export default Dishes;