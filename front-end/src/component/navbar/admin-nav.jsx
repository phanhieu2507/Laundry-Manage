import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { notification } from 'antd';
import NotificationBell from '../notibell'; // Đảm bảo đường dẫn đúng

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

  // Lấy tên người dùng từ local storage (đây là ví dụ, bạn có thể sửa lại cho phù hợp với mã của bạn)
  const userName = JSON.parse(localStorage.getItem('userData')).name;

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white fixed top-0 left-0 right-0 z-10 shadow-sm">
      <div className="flex items-center justify-between w-full px-4">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <div className="cursor-pointer flex items-center ml-auto">
            {/* Đặt NotificationBell trước icon UserOutlined */}
            <NotificationBell />
            <div className="text-gray-900 mr-2">
              <UserOutlined />
            </div>
            <div className="text-gray-900 mr-4">{userName}</div>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminNavbar;
