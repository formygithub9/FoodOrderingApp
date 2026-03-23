import React, { useEffect, useState } from 'react'

const TopProducts = () => {
    const[topFoods, setTopFoods] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/top_selling_foods/')
        .then(res=> res.json())
        .then(data=>{
            setTopFoods(data)
        })
    })
  return (
    <div className='card p-3 shadow'>
        <div class="card-header bg-success text-white">
            <i class="fas fa-star me-2"></i> Top 5 Selling Foods
        </div>
        <div class="card-body">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food Item</th>
                        <th>Total Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {topFoods.map((food,index)=>(
                        <tr key={index}>
                            <td>{index +1}</td>
                            <td>{food.food__item_name}</td>
                            <td>{food.total_sold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TopProducts
