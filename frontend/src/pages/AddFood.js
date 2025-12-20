import React, { useState,useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import {toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFood = () => {

    const [categories,setCategories] = useState([])
    const [formData,setFormData] = useState({
        category : '',
        item_name : '',
        item_price : '',
        item_description : '',
        image: null ,
        item_quantity : ''
    })

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/categories')
        .then(res=>res.json())
        .then(data=>{
            setCategories(data)
        })
      },[])

    const handleChange  = () => {
        
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/add-category/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify()
            });
        
            const data = await response.json();
        
            if(response.status === 201){
                toast.success(data.message);
                            
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
        <div className='row'>
            <div className='col-md-8'>
                <div className='p-4 shadow-sm rounded'>
                    <h4 className='mb-4'>
                        <i className='fas fa-plus-circle text-primary me-2'></i>Add Food Item
                    </h4>

                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className='mb-3'>
                            <label className='form-label'> Food Category</label>
                            <select name='category' className='form-control' value={formData.category} onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {categories.map((cat)=>(
                                    <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Food Item Name</label>
                            <input name="item_name" type="text" className='form-control' value={formData.item_name} placeholder='Enter Food Item Name' onChange={handleChange} required/>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Description</label>
                            <input name="item_description" type="text" className='form-control' value={formData.item_description} placeholder='Enter Description' onChange={handleChange} required/>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Quantity </label>
                            <input name="item_quantity" type="text" className='form-control' value={formData.item_quantity} placeholder='eg. 2 pcs / Large' onChange={handleChange} required/>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Price (₹) </label>
                            <input name="item_price" type="number" className='form-control' value={formData.item_price} placeholder='' onChange={handleChange} required/>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'> Image </label>
                            <input name="image" type="file" accept="image/*" className='form-control' placeholder='' onChange={handleChange} required/>
                        </div>
        
        
                        <button type="submit" className="btn btn-primary mt-2"><i className='fas fa-plus me-2'></i> Add Category</button>
                    </form>
                </div>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <i className='fas fa-utensils' style={{fontSize:'180px', color:'#e5e5e5'}}></i>
            </div>
        </div>
    </AdminLayout>
  );
}

export default AddFood;
