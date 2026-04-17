import React, { useEffect, useState } from 'react'
import PublicLayeout from '../components/PublicLayout'
import '../styles/Home.css'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { wishlistCount, setWishlistCount } = useWishlist();
    const userId = localStorage.getItem('userId');

    const fetchWishlist = async () => {
        if (userId) {
            const res = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}`);
            const data = await res.json();
            setWishlist(data);
        }
    }

    const removeFromWishlist = async (foodId) => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/wishlist/remove/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    food_id: foodId
                })
            })
            if (response.ok) {

                const updatedCount = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}`);
                const wishlistData = await updatedCount.json();
                setWishlistCount(wishlistData.length);

                toast.success('Removed from Wishlist');
                fetchWishlist();
            }
            else {
                toast.error("Failed to update Wishlist.")
            }
        }
        catch (error) {
            toast.error('Something went wrong.');
        }
    }

    useEffect(()=>{
        fetchWishlist();
    },[userId]);

    return (
        <PublicLayeout>
            <div className="container py-5">
                <h2 className="mb-4">My Wishlist</h2>
                <div className='row mt-4'>
                    {wishlist.length === 0 ? (<p className='text-center'>No food items in Wishlist.</p>) : (
                        wishlist.map((food,index) => (
                            <div className='col-md-4 mb-4' key={food.index}>
                                <div className="card hovereffect">
                                    <div className='position-relative'>
                                        <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{ height: '200px', objectFit: 'cover' }} alt="food_img" />
                                        <i className={`fas fa-heart heart-anim position-absolute top-0 end-0 m-2 text-danger d-flex align-items-center justify-content-center`}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                cursor: 'pointer',
                                                fontSize: '20px',
                                                background: 'white',
                                                padding: '5px',
                                                borderRadius: '50%'
                                            }}
                                            onClick={() => removeFromWishlist(food.food_id)}
                                        ></i>
                                    </div>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            <Link to={`/food/${food.food_id}`}>{food.item_name}</Link>
                                        </h5>
                                        <p className='card-text text-muted'>{food.item_description?.slice(0, 40)} {food.item_description?.length > 40 && '...'}</p>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span className='fw-bold'>₹ {food.item_price}</span>
                                            {food.is_available ? (
                                                <Link to={`/food/${food.food_id}`} className='btn btn-outline-primary btn-sm'><i className='fas fa-shopping-basket me-1'></i> Order Now</Link>
                                            ) : (
                                                <div title='This food item is not availabl right now. Please try again later.'><button className='btn btn-outline-secondary btn-sm'><i className='fas fa-times-circle me-1'></i>Currently Unavailable</button></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </PublicLayeout>
    );
}

export default Wishlist;
