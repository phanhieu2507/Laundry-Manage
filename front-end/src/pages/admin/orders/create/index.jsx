import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import axios from "../../../../component/api/axios";
import AdminNavbar from "../../../../component/navbar/admin-nav";
import moment from "moment";

const { Option } = Select;

const AdminCreateOrder = () => {
  const [formData, setFormData] = useState({
    phone: "",
    total_amount: "",
    payment_status: "",
    order_date: "",
    service: "",
    detail: "",
  });
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    const fetchServiceList = async () => {
      try {
        const response = await axios.get("/services");
        setServiceList(response.data);
      } catch (error) {
        console.error("Error fetching service list:", error);
      }
    };
    fetchServiceList();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/orders", formData);
      notification.success({
        message: "Order Created Successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error Creating Order",
        description: error.message,
      });
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create Order</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Phone" name="phone">
            <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </Form.Item>
          <Form.Item label="Total Amount" name="total_amount">
            <Input type="number" value={formData.total_amount} onChange={e => setFormData({...formData, total_amount: e.target.value})} />
          </Form.Item>
          <Form.Item label="Payment Status" name="payment_status">
            <Select value={formData.payment_status} onChange={value => setFormData({...formData, payment_status: value})}>
              <Option value="paid">Paid</Option>
              <Option value="unpaid">Unpaid</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Order Date" name="order_date">
            <DatePicker onChange={(date, dateString) => setFormData({...formData, order_date: dateString})} />
          </Form.Item>
          <Form.Item label="Service" name="service">
            <Select
              mode="multiple"
              value={formData.service}
              onChange={value => setFormData({...formData, service: value})}
            >
              {serviceList.map(service => (
                <Option key={service.service_id} value={service.service_name}>{service.service_name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Detail" name="detail">
            <Input.TextArea value={formData.detail} onChange={e => setFormData({...formData, detail: e.target.value})} />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Create Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminCreateOrder;
