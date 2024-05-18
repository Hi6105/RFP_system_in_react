import React, { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message, Spin, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { API_RESPONSE_TYPE, MESSAGE, PAGES } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import CategoryServices from "../../../api/services/CategoryServices";
import { error, success } from "../../../helper/ToastMessages";
import useValidation from "../../../hooks/useValidation";

const AddCategory = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [rules, setValidation] = useValidation();
  const navigate = useNavigate();

  //setting validations in the form
  useEffect(() => {
    setValidation({
      required: [{ rule: "required" }],
    });
  }, []);

  const onFinish = async (values) => {
    //setting spinning loader to show
    setSpinning(true);

    //Making request to add a new category
    const response = await CategoryServices.addCategory(values);

    //Based on the response displaying the toast message
    if (response?.data?.response === API_RESPONSE_TYPE.ERROR) {
      error(response?.data?.error, messageApi);
    } else {
      success(MESSAGE?.categorySaved, messageApi);
      // Set a timeout to navigate after displaying the success message
      setTimeout(() => {
        navigate(APP_ROUTES?.adminCategories);
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    }
    //setting spinning loader to hide
    setSpinning(false);
  };

  const handleCancel = () => {
    navigate(APP_ROUTES.adminCategories);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>Add Category</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminDashboard}>
              {PAGES?.dashboard}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminCategories}>
              {PAGES?.category}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }}>{PAGES?.addCategory}</Link>
          </Flex>
        </div>
      </div>
      <Spin tip="Loading..." spinning={spinning}>
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
              <Form
                name="normal_login"
                className="login-form"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Category Name"
                  name="name"
                  rules={rules?.required}
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
            </div>
          </div>
        </Content>
      </Spin>
    </>
  );
};

export default AddCategory;
