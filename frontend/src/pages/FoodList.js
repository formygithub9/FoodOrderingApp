import React, {useEffect, useState} from 'react'
import PublicLayeout from '../components/PublicLayout'
import { Link } from 'react-router-dom';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/foods/`)
            .then(res => res.json())
            .then(data => {
                setFoods(data)
            })
    },[]);
  return (
    <PublicLayeout>
        <div className='row mt-4'>
            {foods.length===0 ? (<p className='text-center'>No Food Found.</p>) : (
                foods.map((food)=>(
                    <div className='col-md-4 mb-4'>
                    <div className="card hovereffect">
                        <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{ height: '200px', objectFit: 'cover' }} alt="food_img" />
                        <div className='card-body'>
                            <h5 className='card-title'>
                                <Link to={`/food/${food.id}`}>{food.item_name}</Link>
                            </h5>
                            <p className='card-text text-muted'>{food.item_description?.slice(0,40)} {food.item_description?.length>40 && '...'}</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='fw-bold'>₹ {food.item_price}</span>
                                {food.is_available ? (
                                    <Link to={`/food/${food.id}`} className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
                                ) : (
                                    <div title='This food item is not availabl right now. Please try again later.'><button className='btn btn-outline-secondary btn-sm'><i className='fas fa-times-circle me-1'></i>Currently Unavailable</button></div>
                                ) }
                            </div>
                        </div>
                    </div>
            </div>
                ))
            ) }
        </div>
    </PublicLayeout>
  );
}

export default FoodList;
