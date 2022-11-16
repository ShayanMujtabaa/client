import React from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutlined,
         PlusCircleOutlined,
         MinusCircleOutlined} from '@ant-design/icons'
import DefaultLayout from '../components/DefaultLayout'

const CartPage = () => {

    const { cartItems } = useSelector(state => state.rootReducer)
    
    const dispatch = useDispatch();
    const increaseQuantity=(record)=>{
       
        dispatch({
            type : 'updateCart',
            payload : {...record, quantity: record.quantity + 1 },
        });
    }

    const decreaseQuantity=(record)=>{
       
       if(record.quantity !== 1){
        dispatch({
            type : 'updateCart',
            payload : {...record, quantity: record.quantity - 1 },
        });
       }
    }

    const columns = [
      {
        title: 'Image',
        dataIndex: 'image',
        render: (image, record) => <img src={image} alt='' height='60' width='60' />
      },
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Price',
        dataIndex: 'price'
      },
      {
        title: 'Quantity',
        dataIndex: 'id',
        render: (id, record) => <div>
          <PlusCircleOutlined className='mx-3'onClick={()=>increaseQuantity(record)}/>
          <b>{record.quantity}</b>
          <MinusCircleOutlined className='mx-3'onClick={()=>decreaseQuantity(record)}/>
        </div>
      },
      {
        title: 'Void',
        dataIndex: 'id',
        render: (id, record) => <DeleteOutlined onClick={()=>dispatch({type:'deleteFromCart' , payload :record})}/>
      }
    ]

  return (
    <DefaultLayout> 
        <Table columns={columns} dataSource={cartItems} bordered />
    </DefaultLayout>
  )
}

export default CartPage