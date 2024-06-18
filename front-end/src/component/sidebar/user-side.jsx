import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  FormOutlined, 
  CommentOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const UserSidebar = () => {
  const getPathKey = (path) => {
    switch (path) {
      case '/user/services': return '1';
      case '/user/request-orders': return '2';
      case '/user/orders': return '3';
      case '/user/profile': return '4';
      default: return '1';
    }
  };

  return (
    <Sider
      className="bg-white fixed top-0 left-0 bottom-0 z-10 shadow-md"
      width={200}
      theme="light"
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="text-black text-center my-4">
            <h3 className="text-lg font-bold">User Panel</h3>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[getPathKey(window.location.pathname)]}
            style={{ borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<UserOutlined />} className="hover:bg-gray-200">
              <Link to="/user/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<CommentOutlined />} className="hover:bg-gray-200">
              <Link to="/user/request-orders">Request Orders</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShoppingCartOutlined />} className="hover:bg-gray-200">
              <Link to="/user/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />} className="hover:bg-gray-200">
              <Link to="/user/profile">Profile</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default UserSidebar;
