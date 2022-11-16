import '../resources/layout.css'
import {
  ShopOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Image } from 'antd';
import logo from '../resources/iTech-Logo.png'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './Cart';
const { Header, Sider, Content } = Layout;
const HPLayout = (props) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const { cartItems, loading } = useSelector(state => state.rootReducer)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <Layout className="site-layout">
      {loading && (
        <div className='spinner'>
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <div className="logo">
        <h3>
          <Image src={logo} alt='' preview={false}/>
          </h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: '/home',
              icon: <ShopOutlined />,
              label: <Link to='/home'>Home</Link>,
            },
            {
              key: '/bills',
              icon: <BarChartOutlined />,
              label: <Link to='/bills'>Bills</Link>,
            },
            {
              key: '/items',
              icon: <UnorderedListOutlined />,
              label: <Link to='/items'>Items</Link>,
            },
            {
              key: '/cart',
              icon: <ShoppingCartOutlined />,
              label: <Link to='/cart'>Cart</Link>,
            },
            {
              key: '/logout',
              icon: <LogoutOutlined />,
              label: <Link to='/logout'>Logout</Link>,
            }
          ]}
        />

      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{
            padding: 10,

          }}
        >
          {React.createElement(collapsed ? DoubleRightOutlined : DoubleLeftOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

          <div className='cart-count d-flex align-items-center' onClick={() => navigate('/cart')}>
            <ShoppingCartOutlined />
            <b><p className='mt-3 mr-2'>{cartItems.length}</p></b>
          </div>


        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '10px',
            padding: 24
          }}
        >
          {props.children}
        </Content>
      </Layout >
      <Sider className='cart-comp-sider' width={288} >
        <Cart />
      </Sider>
    </Layout>

  );
};
export default HPLayout;


