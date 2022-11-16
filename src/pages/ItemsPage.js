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

  const [editingItem, setEditingItem] = useState(null)

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
        <EditOutlined className='mx-2' onClick={() => {
          setEditingItem(record)
          setAddEditModalVisibility(true)
        }} />
        <DeleteOutlined className='mx-2' />
      </div>
    }
  ]

  useEffect(() => {
    getAllItems()
  }, [])

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' })
    if (editingItem === null) {
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
    else {
      axios
        .post('/api/items/edit-item', { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: 'hideLoading' })
          message.success('Item edited successfully')
          setEditingItem(null)
          setAddEditModalVisibility(false)
          getAllItems()
        })
        .catch((error) => {
          dispatch({ type: 'hideLoading' })
          message.error('Something went wrong while editing the item')
          console.log(error)
        })
    }
  }

  return (

    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>items</h3>
        <Button type='primary' onClick={() => setAddEditModalVisibility(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />


      {addEditModalVisibility && (

        <Modal onCancel={() => {
          setEditingItem(null)
          setAddEditModalVisibility(false)
        }} open={addEditModalVisibility} title={`${editingItem !== null ? 'Edit Item' : 'Add New Item'}`} footer={false}>
          <Form initialValues={editingItem} layout='vertical' onFinish={onFinish}>

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

      )}

    </DefaultLayout>

  )
}

export default ItemsPage