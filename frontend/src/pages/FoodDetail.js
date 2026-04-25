import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'

const FoodDetail = () => {
    const userId = localStorage.getItem('userId');
    const [food, setFood] =useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const [reviews, setReviews] =useState([]);
    const [rating, setRating] =useState(0);
    const [comment, setComment] =useState('');
    const [hoveredRating, setHoveredRating] =useState(0);
    const [editId, setEditId] =useState('');


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/foods/${id}`)
        .then(res => res.json())
        .then(data => {
            setFood(data)
        })
    },[id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/reviews/${id}`)
        .then(res => res.json())
        .then(data => {
            setReviews(data)
        })
    },[id]);

    const handleAddToCart = async (e) => {
        if (!userId){
            navigate('/login')
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/add/`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: userId,
                    foodId : food.id
                })
            });

            const result = await response.json();

            if (response.status === 200) {
                toast.success(result.message || 'Item Added to Cart' );
                setTimeout(()=>{
                    navigate('/cart');
                },2000);
            }
            else{
                toast.error(result.message || 'Something went wrong.');
            }
        }
        catch(error){
            console.error(error);
            toast.error("Error connecting to server.");
        }
    }

    const handleReviewSubmit = async (e) => {
        if (!userId){
            toast.warning('Please log in first to submit review.')
            navigate('/login');
            return;
        }

        if(rating<1 || rating>5){
            toast.error('Please select a rating from 1 to 5.');
            return;
        }

        const payload = {
            user_id : userId ,
            food : id ,
            rating,
            comment
        };

        const url = editId ? `http://127.0.0.1:8000/api/review_edit/${editId}` : `http://127.0.0.1:8000/api/reviews/add/${id}`

        const method = editId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url,{
                method,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({payload})
            });

            if (response.ok) {
                toast.success( editId ? 'Review Updated.' : 'Review Submitted.' );
                setComment('');
                setRating(0)
                setEditId(null)
                const updatedReviews = await fetch(`http://127.0.0.1:8000/api/reviews/${id}/`).then(res => res.json())
                setReviews(updatedReviews);
            }
            else{
                toast.error('Something went wrong.');
            }
        }
        catch(error){
            console.error(error);
            toast.error("Error connecting to server.");
        }
    };

    const fetchReviews = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/reviews/${id}/`);
        const data = await res.json();
        setReviews(data);
    }
    
    const handleDeleteReview = async () => {
        const confirmDelete = window.confirm('Are you sure to delete this review ?');
        if (! confirmDelete) return;
        const res = await fetch(`http://127.0.0.1:8000/api/review_edit/${id}/`,{
            method : 'DELETE',
        });
        if (res.ok){
            toast.success('Review deleted successfully.')
            fetchReviews(); //reload
        }
        else {
            toast.error('Failed to delete.');
        }
    }

    const renderStars = (count, clickable= false) => {
        const stars = []
        for (let i=1; i<=5; i++){
            stars.push(
                <i key={i} className={`fa-star ${i<=(hoveredRating || count) ? 'fas text-warning'}` : 'far text-secondary' }></i>
            )
        }
    }

  if(!food) return <div>Loading...</div>
  return (
    <PublicLayout>
        <ToastContainer position='top-center'></ToastContainer>
        <div className="container py-5">
            <div className="row">
                <div className="col-md-5 text-center">
                    <Zoom>
                        <img src={`http://127.0.0.1:8000${food.image}`} style={{width:'100%', maxHeight:'300px'}} />
                    </Zoom>
                </div>

                <div className="col-md-7">
                    <h2>{food.item_name}</h2>
                    <p className='text-muted'>{food.item_description}</p>
                    <p><strong>Category:</strong>{food.category_name}</p>
                    <h4>₹ {food.item_price}</h4>
                    <p className="mt-3">Shipping: <strong>Free</strong></p>

                    {food.is_available ? (
                        <button className='btn btn-warning btn-lg mt-3 px-4' onClick={handleAddToCart}>
                            <i className='fas fa-cart-plus me-1'></i> Add to Cart
                        </button>
                    ) : (
                        <div title='This food item is not available right now. Please try again later.'>
                            <button className='btn btn-outline-secondary btn-sm'>
                                <i className='fas fa-times-circle me-1'></i> Currently Unavailable
                            </button>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    </PublicLayout>
  );
}

export default FoodDetail;
