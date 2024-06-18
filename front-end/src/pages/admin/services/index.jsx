import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Pagination,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../../../component/api/axios";
import AdminNavbar from "../../../component/navbar/admin-nav";
import AdminSidebar from "../../../component/sidebar/admin-side";

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const [form] = Form.useForm();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setServices(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/services/${id}`);
    fetchData();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.service_id) {
        await axios.put(`/services/${values.service_id}`, values);
      } else {
        await axios.post("/services", values);
      }
      setVisible(false);
      fetchData();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ml-64 p-4">
          <div className="pt-8">
            <div className="text-2xl font-semibold text-left mt-8 mb-8 text-gray-800">
              My Laundry's Service
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-32"
            >
              Add Service
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-12 shadow-lg border rounded-2xl px-24 m-2">
              {currentServices.map((service) => (
                <Card
                  key={service.service_id}
                  title={service.service_name}
                  className="flex flex-col justify-between border-indigo-300 rounded-xl h-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="overflow-y-auto p-4">
                    <p>
                      <strong>Service ID:</strong> {service.service_id}
                    </p>
                    <p>
                      <strong>Duration:</strong> {service.duration} minutes
                    </p>
                    <p>
                      <strong>Description:</strong> {service.description}
                    </p>
                    <p>
                      <strong>Is Available:</strong>{" "}
                      {service.is_available ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Price Per Unit:</strong> $
                      {service.price_per_unit || "N/A"}
                    </p>
                    <p>
                      <strong>Unit Type:</strong> {service.unit_type || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-end items-center p-4 space-x-2">
                    <Button
                      type="primary"
                      onClick={() => handleEdit(service)}
                      icon={<EditOutlined />}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-24"
                    >
                      Edit
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleDelete(service.service_id)}
                      icon={<DeleteOutlined />}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg w-24"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              pageSize={servicesPerPage}
              total={services.length}
              className="mt-8"
            />
          </div>
        </div>
      </div>
      <Modal
        title="Add Service"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-500 hover:bg-blue-400" }}
      >
        <Form form={form} layout="vertical" name="serviceForm">
          <Form.Item name="service_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Service Name"
            name="service_name"
            rules={[{ required: true, message: "Please input service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                message: "Please input valid duration!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Is Available"
            name="is_available"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Price Per Unit"
            name="price_per_unit"
            rules={[
              {
                type: "number",
                min: 0,
                message: "Please input valid price per unit!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="Unit Type" name="unit_type">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminService;
