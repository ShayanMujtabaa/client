import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Row } from 'antd'
import Items from '../components/Items'
import { useDispatch } from 'react-redux'
import HPLayout from '../components/HPLayout'

const Homepage = () => {

  const [itemsData, setItemsData] = useState([])
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type : 'showLoading'})
    axios.get('/api/items/get-all-items').then((response) => {
      dispatch({type : 'hideLoading'})
      setItemsData(response.data)
    }).catch((error) => {
      dispatch({type : 'hideLoading'})
      console.log(error)
    })
  }

  useEffect(() => {
    getAllItems()
  }, [])


  return (
    <div>
      <HPLayout>
        
        <Row gutter={20}>
          {itemsData.map((item) => {
            return <Col xs={27} lg={8} md={24} sm={24}>
              <Items item={item} />
            </Col>
          })}
        </Row>

      </HPLayout>
    </div>
  )
}

export default Homepage