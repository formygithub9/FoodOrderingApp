import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';

const OrdersNotConfirmed = () => {
    const [orders, setOrders] = useState([])
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();

    useEffect(() => {
        if(!adminUser){
            navigate('/admin-login');
        }
        fetch('http://127.0.0.1:8000/api/orders-not-confirmed/')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)

            })
    }, [])


    return (
        <AdminLayout>
            <div>
                <h3 className='text-center text-primary'>
                    <i className='fas fa-list-alt me-1'></i>
                    Details of Not Confirmed Orders
                </h3>
                <h5 className='text-end text-muted'>
                    <i className='fas fa-database me-1'></i>Total Not Confirmed Orders
                    <span className='ms-2 badge bg-success'>{orders.length}</span>
                </h5>

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

export default OrdersNotConfirmed
