import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, message, Modal, Select, Table } from 'antd'
import { Checkbox, Form, Input } from 'antd';

const ItemsPage = () => {

  const [itemsData, setItemsData] = useState([])

  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false)

  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/items/get-all-items').then((response) => {
      dispatch({ type: 'hideLoading' })
      setItemsData(response.data)
    }).catch((error) => {
      dispatch({ type: 'hideLoading' })
      console.log(error)
    })
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
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
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id, record) => <div className='d-flex'>
        <DeleteOutlined className='mx-2' />
        <EditOutlined className='mx-2' />
      </div>
    }
  ]

  useEffect(() => {
    getAllItems()
  }, [])

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' })
    axios
      .post('/api/items/add-item', values).then((response) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item added successfully')
        setAddEditModalVisibility(false)
        getAllItems()
      })
      .catch((error) => {
        dispatch({ type: 'hideLoading' })
        message.error('Something went wrong while adding the item')
        console.log(error)
      })
  }

  return (

    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>items</h3>
        <Button type='primary' onClick={() => setAddEditModalVisibility(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />


      <Modal onCancel={() => setAddEditModalVisibility(false)} open={addEditModalVisibility} title='Add New Item' footer={false}>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item name='id' label='Id'>
            <Input placeholder='Insert a unique item id' type='number' />
          </Form.Item>

          <Form.Item name='name' label='Name'>
            <Input placeholder='Insert item name' />
          </Form.Item>

          <Form.Item name='price' label='Price'>
            <Input placeholder='Insert item price' type='number' />
          </Form.Item>

          <Form.Item name='image' label='Image URL'>
            <Input placeholder='Insert image URL' />
          </Form.Item>

          <Form.Item name='category' label='Category'>
            <Select placeholder='Select category'>
              <Select.Option value='Burgers'>Burgers</Select.Option>
              <Select.Option value='Pizza'>Pizza</Select.Option>
              <Select.Option value='Add-Ons'>Add-Ons</Select.Option>
              <Select.Option value='Drinks'>Drinks</Select.Option>
            </Select>
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button htmlType='submit' type='primary'>Submit</Button>
          </div>

        </Form>
      </Modal>

    </DefaultLayout>

  )
}

export default ItemsPage