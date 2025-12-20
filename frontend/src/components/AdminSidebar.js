import React, {useState} from 'react';

import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaEdit, FaFile, FaList, FaSearch, FaStar, FaThLarge, FaUsers } from 'react-icons/fa';
const AdminSidebar = () => {
  
    const [openMenus, setOpenMenus] =useState({
        category : false,
        food : false,
        orders : false
    })

    const toggleMenu = (menu) => {
        setOpenMenus((prev)=>({...prev ,[menu]:!prev[menu]}));
    }
  return (
    <div className='bg-dark text-white sidebar'>
      <div className='text-center p-3 border-bottom' >
        <img src="/images/admin.png" width="70" className='img-fluid rounded-circle mb-2' alt="Admin Img" />
        <h6 className='mb-0'>Admin</h6>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
            <FaThLarge/> Dashboard
        </Link>

        <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'>
            <FaUsers/> Registerd Users
        </Link>
      </div>
      
      <button onClick={()=>toggleMenu('category')} className='list-group-item list-group-item-action bg-dark text-white border-0'>
        <FaEdit/> Food Category {openMenus.category ? <FaChevronUp/> : <FaChevronDown/>}
      </button>
        {openMenus.category && (
            <div className='ps-4'>
        
                <Link to='/add-category' className='list-group-item list-group-item-action bg-dark text-white border-0'>
                    Add Category
                </Link>
            
                <Link to='/manage-category' className='list-group-item list-group-item-action bg-dark text-white border-0'>
                    Manage Category
                </Link>
        
            </div>

        )}
      

      <button onClick={()=>toggleMenu('food')} className='list-group-item list-group-item-action bg-dark text-white border-0'>
        <FaEdit/> Food Menu {openMenus.food ? <FaChevronUp/> : <FaChevronDown/>}
      </button>
        {openMenus.food && (
            <div className='ps-4'>
        
                <Link to='/add-food' className='list-group-item list-group-item-action bg-dark text-white border-0'>
                    Add Food Item
                </Link>
            
                <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                    Manage Food Item
                </Link>
                
            </div>
    
        )}

        <button onClick={()=>toggleMenu('orders')} className='list-group-item list-group-item-action bg-dark text-white border-0'>
            <FaList/> Orders {openMenus.orders ? <FaChevronUp/> : <FaChevronDown/>}
        </button>
            {openMenus.orders && (
                <div className='ps-4'>
            
                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        Not Confirmed
                    </Link>
                
                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        Confirmed
                    </Link>

                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        Being Prepared
                    </Link>

                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        Food Pickup
                    </Link>

                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        Delivered
                    </Link>

                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        Cancelled
                    </Link>
                    
                    <Link className='list-group-item list-group-item-action bg-dark text-white border-0'>
                        All Orders
                    </Link>
                </div>
        
            )}
      
      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'>
            <FaFile/> B/W Dates Report
        </Link>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'>
            <FaSearch/> Search
        </Link>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'>
            <FaStar/> Manage Reviews
        </Link>
      </div>

      </div>

    </div>
  );
}

export default AdminSidebar;
