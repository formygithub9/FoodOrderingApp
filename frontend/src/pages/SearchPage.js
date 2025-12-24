import React, { useEffect, useState} from 'react';
import PublicLayout from '../components/PublicLayout';
import { Link, useLocation } from 'react-router-dom';
import '../styles/searchpage.css';

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search).get('q') || '';
  const [foods, setFoods] = useState([]);
  useEffect(()=>{
    if (query){
        fetch(`http://127.0.0.1:8000/api/food_search/?q=${query}`)
        .then(res => res.json())
        .then(data => {
            setFoods(data)
        })
    }
  },[query]);
  //useLOcation().search -> ?q=burger
  return (
    <PublicLayout>
        <div className='container py-4'>
            <h3 className='text-primary text-center'>Results for: {query}</h3>
            <div className='row mt-4'>
                {foods.length===0 ? (<p className='text-center'>No Food Found.</p>) : (
                    foods.map((food)=>(
                        <div className='col-md-4 mb-4'>
                        <div className="card hovereffect">
                            <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' alt="food_img" />
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    <Link to="#">{food.item_name}</Link>
                                </h5>
                                <p className='card-text text-muted'>{food.item_description?.slice(0,40)} {food.item_description?.length>40 && '...'}</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='fw-bold'>₹ {food.item_price}</span>
                                    {food.is_available ? (
                                        <Link to="" className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
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
        </div>
    </PublicLayout>
  );
}

export default SearchPage;
