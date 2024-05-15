import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Flex,
  message,
  Select,
  Card,
  DatePicker,
} from "antd";
import { Content } from "antd/es/layout/layout";
import {
  API_RESPONSE_TYPE,
  MESSAGE,
  VALIDATION,
  REGEX,
} from "../../../constants";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import CategoryServices from "../../../api/services/CategoryServices";
import { error, success } from "../../../helper/ToastMessages";
import { fetchCategories } from "../../../helper/Fetchdata";

const AddRfp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Storing data of categories from API fetch
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    const response = await CategoryServices.addCategory(values);
    console.log(response);

    if (response?.data?.response === API_RESPONSE_TYPE.ERROR) {
      error(response?.data?.error, messageApi);
    } else {
      success(MESSAGE?.categorySaved, messageApi);
    }
  };

  const handleCancel = () => {
    navigate(APP_ROUTES?.rfpList);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>Add Category</h1>
        <p style={{ marginLeft: "auto" }}>Home</p>
      </div>
      <Content
        style={{
          margin: "0 16px",
          overflow: "initial",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Card>
              <Form
                form={form}
                layout="vertical"
                style={{
                  maxWidth: 600,
                }}
              >
                <Form.Item
                  label="Select Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.categories,
                    },
                  ]}
                >
                  <Select>
                    {Object.values(categories).map((category) => (
                      <Select.Option key={category?.id} value={category?.id}>
                        {category?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Item Name"
                  name="itemName"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Item Description"
                  name="itemDescription"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                    {
                      pattern: REGEX?.number,
                      message: VALIDATION?.numeric,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Last Date"
                  name="lastdate"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Minimum Price"
                  name="minPrice"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                    {
                      pattern: REGEX?.number,
                      message: VALIDATION?.numeric,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Maximum Price"
                  name="maxPrice"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                    {
                      pattern: REGEX?.number,
                      message: VALIDATION?.numeric,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Flex justify="flex-end" gap="middle">
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </Flex>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </Content>
    </>
  );
};

export default AddRfp;
