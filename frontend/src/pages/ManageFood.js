import React, {useState, useEffect} from 'react';
import AdminLayout from '../components/AdminLayout';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const ManageFood = () => {
    const [foods,setFoods] = useState([])
      const [allfoods,setAllFoods] = useState([])
      
      useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/foods')
        .then(res=>res.json())
        .then(data=>{
            setFoods(data)
            setAllFoods(data)
        })
      },[])
    
      const handleSearch=(s)=>{
        const keyword = s.toLowerCase();
        if(!keyword){
            setFoods(allfoods);
        }
        else{
            const filtered = allfoods.filter((c)=>c.item_name.toLowerCase().includes(keyword))
            setFoods(filtered)
        }    
      }
  return (
    <AdminLayout>
        <div>
            <h3 className='text-center text-primary'>
                <i className='fas fa-list-alt me-1'></i>
                Manage Food Item
            </h3>
            <h5 className='text-end text-muted'>
                <i className='fas fa-database me-1'></i>Total Categories
            <span className='ms-2 badge bg-success'>{foods.length}</span>
            </h5>

            <div className='mb-3 d-flex justify-content-between'>
                <input type="text" className='form-control w-50' placeholder='search by food item name...' onChange={(e)=>handleSearch(e.target.value)} />
                <CSVLink data={foods} className='btn btn-outline-success' filename='food_list'>
                    <i className='fas fa-file-csv me-2'></i>Export to CSV
                </CSVLink>
            </div>

            <table className='table table-bordered table-hover table-stripped'>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Category Name</th>
                        <th>Food Item Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food,index)=>(
                        <tr key={food.id}>
                        <td>{index+1}</td>
                        <td>{food.category_name}</td>
                        <td>{food.item_name}</td>
                        <td>
                            <Link className="btn btn-sm btn-outline-primary me-2"><i className='fas fa-edit me-1'></i> Edit</Link>

                            <button className='btn btn-sm btn-outline-danger'>
                                <i className='fas fa-trash-alt me-1'></i>Delete
                            </button>
                        </td>
                        </tr>
                        ))}
                    
                </tbody>
            </table>
        </div>
    </AdminLayout>
  );
}

export default ManageFood;
