import React, {useEffect, useState} from 'react'
import PublicLayeout from '../components/PublicLayout'
import '../styles/Home.css'
import { Link } from 'react-router-dom';

function Home() {
  const [foods, setFoods] = useState([]);
  useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/random_foods`)
          .then(res => res.json())
          .then(data => {
              setFoods(data)
          })
    },[]);
  return (
    <PublicLayeout>
      <section className='hero py-5 text-center' style={{backgroundImage:"url('/images/food2.jpg')"}}>
        <div style={{
          backgroundColor:"rgba(0,0,0,0.5)",padding:"40px 20px",
          borderRadius : "10px",
          }}>
          <h1 className='display-4'>Quick & Hot Food, Delivered to You</h1>
          <p className='lead'>Craving something tasty? Let's get it to your door.</p>
          <form method="GET" action="/search" className='d-flex' style={{maxWidth:"600px", margin:"0 auto"}}>
            <input type="text" name='q' placeholder='I would like to eat...' className='form-control' style={{borderTopRightRadius:0,borderBottomRightRadius:0}} />
            <button className='btn btn-warning px-4' style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>Search</button>
          </form>
        </div>
      </section>
      <section className='py-5'>
          <div className="container">
            <h2 className='text-center mb-4'>Most Loved Dishes
              <span className='badge bg-danger ms-2'>Top Picks</span>
            </h2>

            <div className='row mt-4'>
                {foods.length===0 ? (<p className='text-center'>No Food Found.</p>) : (
                    foods.map((food)=>(
                        <div className='col-md-4 mb-4'>
                        <div className="card hovereffect">
                            <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{ height: '200px', objectFit: 'cover' }} alt="food_img" />
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
      </section>
    </PublicLayeout>
  )
}

export default Home
