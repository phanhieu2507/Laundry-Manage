import React from 'react';
import { Layout, Menu, Dropdown, notification } from 'antd';
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NotificationBell from '../notibell'; // Đảm bảo đường dẫn đúng

const { Header } = Layout;

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
    localStorage.removeItem('userData');
    navigate('/login');
    notification.success({
      message: "Bạn đã đăng xuất",
    });
  };

  // Lấy tên người dùng từ localStorage, nếu không có giá trị mặc định là 'Guest'
  const userName = JSON.parse(localStorage.getItem('userData'))?.name || 'Guest';

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white fixed top-0 left-0 right-0 z-10 shadow-sm">
      <div className="flex items-center justify-end pr-4">
        <NotificationBell />
        <div className="ml-10">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className="cursor-pointer flex items-center">
              <div className="text-gray-900 mr-2">
                <UserOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
              </div>
              <div className="text-gray-900 mr-4" style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{userName}</div>
              <DownOutlined style={{ color: 'rgba(0, 0, 0, 0.85)' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default UserNavbar;
