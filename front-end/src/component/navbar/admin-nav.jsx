import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  FormOutlined, 
  CommentOutlined, 
  MessageOutlined, 
  BarChartOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { notification } from 'antd';

const { Header } = Layout;

const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Xử lý logout
    navigate('/login');
    notification.success({
      message: "Bạn đã Log out",
    });
  };

  const getPathKey = (path) => {
    switch (path) {
      case '/admin/services': return '1';
      case '/admin/request-orders': return '2';
      case '/admin/orders': return '3'; // Bao gồm cả các sub-path của orders
      case '/admin/users': return '4';
      default: return '1';
    }
  };

  return (
    <Header className="bg-gray-800 fixed top-0 left-0 right-0 z-10 shadow-sm">
      <Menu theme="dark" mode="horizontal" selectedKeys={[getPathKey(window.location.pathname)]} className="flex">
        <Menu.Item key="1" icon={<BarChartOutlined />} className="hover:bg-gray-700">
          <Link to="/admin/services">Services</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<MessageOutlined />} className="hover:bg-gray-700">
          <Link to="/admin/request-orders">Requests</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FormOutlined />} className="hover:bg-gray-700">
          <Link to="/admin/orders">Orders</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} className="hover:bg-gray-700">
          <Link to="/admin/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout} className="ml-auto hover:bg-gray-700">
          Log Out
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AdminNavbar;
