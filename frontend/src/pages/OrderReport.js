import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const OrderReport = () => {
    const[orders,setOrders] = useState([])
    const adminUser = localStorage.getItem('adminUser');
    const[formData,setFormData] = useState({
        from_date: '',
        to_date: '',
        status:'all',
    })
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
    },[]);

    const handleChange = (e) =>{
        
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/order-between-dates/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            });
        
            const data = await response.json();
        
            if(response.status === 200){
                setOrders(data);
                            
            }
            else{
                toast.error("Something went wrong.")
            }
        }
        catch (error){
            console.error(error);
            toast.error("Error Connecting to Server")
        }
        };

  return (
    <AdminLayout>
        <ToastContainer position="top-right" autoClose={2000} />
        <div>
            <h3 className='text-center text-primary'>
                <i className='fas fa-list-alt me-1'></i>
                Between Dates Report
            </h3>
            
            <form onSubmit={handleSubmit} className='mb-4'>
                <div class="row mb-3">
                    <div class="col-md-4">
                        <label for="">From Date</label>
                        <input type="date" name="from_date" onChange={handleChange} className='form-control' required/>
                    </div>

                    <div class="col-md-4">
                        <label for="">To Date</label>
                        <input type="date" name="to_date" onChange={handleChange} className='form-control' required/>
                    </div>

                    <div class="col-md-4">
                        <label for="">Status</label>
                        <select name="status" onChange={handleChange} className='form-control'>
                            <option value="all">All</option>
                            <option value="not_confirmed">Not Confirmed</option>
                            <option value="all">Order Confirmed</option>
                            <option value="all">Food being Prepared</option>
                            <option value="all">Food Pickup</option>
                            <option value="all">Food Delivered</option>
                            <option value="all">Order Cancelled</option>
                        </select>
                    </div>
                </div>
            </form>
            <table className='table table-bordered table-hover table-stripped'>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.order_number}</td>
                            <td>{new Date(order.order_time).toLocaleString()}</td>
                            <td>
                                <Link to={`/admin-view-order-detail/${order.order_number}`} className="btn btn-sm btn-outline-primary me-2"> View Details</Link>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </AdminLayout>
  )
}

export default OrderReport
