import React from 'react'
import { Button } from 'antd'
import '../resources/items.css'
import { useDispatch } from 'react-redux'

const Items = ({ item }) => {
    const dispatch = useDispatch() 
    function addToCart() {
      dispatch({type : 'addToCart' , payload : {...item , quantity:1}})
    }
    return (
        <div className='item'>
            <h4 className='name'>{item.name}</h4>
            <img src={item.image} alt="test" height='100px' width='100' />
            <h4 className='price'><b>Price:</b> Rs. {item.price} /-</h4>
            <div className="d-flex justify-content-end">
                <Button onClick={()=>addToCart()}>Add To Cart</Button>
            </div>
        </div>
    )
}

export default Items