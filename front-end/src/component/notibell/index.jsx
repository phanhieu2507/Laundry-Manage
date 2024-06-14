import React, { useState, useEffect } from 'react';
import { Badge, Popover, List, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import axios from '../api/axios';

const NotificationBell = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
        const id = JSON.parse(localStorage.getItem('userData')).user_id;
      const { data } = await axios.get('/notifications',{ id });
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
    if (visible) {
      markAllAsRead();
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post('/api/notifications/mark-all-as-read');
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const content = (
    <List
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={item => (
        <List.Item style={{ backgroundColor: item.read_at ? 'white' : '#e6f7ff' }}>
          <List.Item.Meta
            title={item.title}
            description={item.message}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Popover
      content={content}
      title="Notifications"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottomRight"
    >
      <Badge count={notifications.filter(noti => !noti.read_at).length}>
        <Button icon={<BellOutlined />} shape="circle" />
      </Badge>
    </Popover>
  );
};

export default NotificationBell;
