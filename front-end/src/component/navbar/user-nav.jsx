import { Layout, Menu, notification } from 'antd';
import { UserOutlined, FormOutlined, CommentOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const { Header } = Layout;

const UserNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    navigate('/login');
    notification.success({
      message: "Bạn đã Log out",
    });
  };

  const getKeyFromPathname = (pathname) => {
    if (pathname.includes('/services')) {
      return '1';
    } else if (pathname.includes('/orders')) {
      return '2';
    } else if (pathname.includes('/request-orders')) {
      return '3';
    } else if (pathname.includes('/profile')) {
      return '4';
    }
    return '1';
  };

  const selectedKey = getKeyFromPathname(pathname);

  return (
    <Header className="bg-gray-800 text-gray-300 fixed top-0 left-0 right-0 z-10 shadow-sm">
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} className="flex">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/services">Services</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FormOutlined />}>
          <Link to={`/user/orders`}>Orders</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CommentOutlined />}>
          <Link to={`/user/request-orders`}>Request Orders</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to={`/user/profile`}>Profile</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
          Log Out
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default UserNavbar;
