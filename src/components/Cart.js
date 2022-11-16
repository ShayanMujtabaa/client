import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const { cartItems } = useSelector(state => state.rootReducer)
  const columns = [

    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Quantity',
      dataIndex: 'id',
      render: (id, record) => <div>
        <b>{record.quantity}</b>
      </div>
    },
    {
      title: 'Price',
      dataIndex: 'price'
    }
  ]
  return (

    <Table className='cart-comp' columns={columns} dataSource={cartItems} size="medium" bordered />


  )
}

export default Cart