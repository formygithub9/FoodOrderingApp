import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const userId = localStorage.getItem('userId');
    const [paymentMode, setPaymentMode] = useState(['']);
    const [address, setAddress] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (paymentMode === 'online') {
            const { cardNumber, expiry, cvv } = cardDetails;

            if (!cardNumber || !expiry || !cvv) {
                toast.error('Please fill in all card details.');
                return;
            }
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/place_order/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    address: address,
                    paymentMode: paymentMode,
                    cardNumber: paymentMode === 'online' ? cardDetails.cardNumber : '',
                    expiry: paymentMode === 'online' ? cardDetails.expiry : '',
                    cvv: paymentMode === 'online' ? cardDetails.cvv : ''
                })
            });

            const result = await response.json();

            if (response.status === 201) {
                toast.success(result.message);
                setTimeout(() => {
                    navigate('/my-oredrs');
                }, 2000);
            }
            else {
                toast.error(result.message || 'Something went wrong.');
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Error connecting to server.");
        }
        
    }
    return (
        <PublicLayout>
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="container py-5">
                <h3 className="text-center text-primary mb-4">
                    <i className='fas fa-credit-card me-2'></i> Checkout & Payment
                </h3>
                <div className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label htmlFor="" className='form-label fw-semibold'>Delivery Address</label>
                        <textarea className='form-control border-primary-subtle' rows='3' placeholder='Enter your full delivery address' value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" name='paymentMode' value="cod" checked={paymentMode === 'cod'} onChange={() => setPaymentMode('cod')} required/>
                        <label className='form-check-label'>Cash on Delivery</label>
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="radio" name='paymentMode' value="online" checked={paymentMode === 'online'} onChange={() => setPaymentMode('online')} required/>
                        <label className='form-check-label'>Online Payment</label>
                    </div>

                    {paymentMode === 'online' && (
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Card Number</label>
                                <input type="text" placeholder='1234 **** **** ****' value={cardDetails.cardNumber} className="form-control" onChange={(e)=>setCardDetails({
                                    ...cardDetails,
                                    cardNumber:e.target.value
                                })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Expiry</label>
                                <input type="text" placeholder='MM/YY' value={cardDetails.expiry} className="form-control" onChange={(e)=>setCardDetails({
                                    ...cardDetails,
                                    expiry:e.target.value
                                })} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">CVV</label>
                                <input type="password" placeholder='***' value={cardDetails.cvv} className="form-control" onChange={(e)=>setCardDetails({
                                    ...cardDetails,
                                    cvv:e.target.value
                                })} />
                            </div>
                            
                        </div>
                    )}
                    <button className="btn btn-success mt-4 w-100" onClick={handlePlaceOrder}>
                        <i className='fas fa-check-circle me-2'></i> Confirm & Place Order
                    </button>
                </div>



            </div>
        </PublicLayout>
    );
}

export default PaymentPage;
