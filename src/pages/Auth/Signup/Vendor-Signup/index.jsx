import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import axios from "axios";
import { success, error } from "../../../../helper/ToastMessages";
import { API_BASE_URL, API_ENDPOINTS } from "../../../../config/AppConfig";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../../constants";

// Form item layout settings
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

// Function to fetch all the categories
const fetchCategories = async () => {
  try {
    // Making a request to the categories API endpoint
    const response = await axios.get(
      `${API_BASE_URL}/${API_ENDPOINTS.categories}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Returning data of categories on success response
    if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
      return response?.data?.categories;
    }
    // Handle the API response as needed
  } catch (error) {
    console.error("API Error:", error);
    // Returning empty array if some error occurs from backend.
    return [];
  }
  // Returning empty array if some error occurs from backend.
  return [];
};

const VendorSignup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    // Storing data of categories from API fetch
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  //Function for registering a new vendor on form submission.
  const onFinish = async (values) => {
    //Constructing the data object for sending the data at API call.
    const data = {
      firstname: values?.firstName,
      lastname: values?.lastName,
      email: values?.email,
      password: values?.password,
      revenue: values?.revenue,
      no_of_employees: values?.numberOfEmployees,
      pancard_no: values?.panNo,
      gst_no: values?.gstNo,
      mobile: values?.phoneNo,
      category: values?.category,
    };

    //Making the registration API call for vendor
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.registerVendor}`,
        data // This will send the form values as the request body
      );

      //Displaying toast message on successful registration
      if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
        success(MESSAGE?.vendorRegistration?.success, messageApi);
      } else {
        error(response?.data?.response, messageApi);
      }
      // Handle the API response as needed
    } catch (error) {
      console.error("API Error:", error);
      // Handle errors if any
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          width: "35%",
          marginRight: "auto",
          backgroundColor: "#fff",
          marginLeft: "auto",
          marginTop: "100px",
          marginBottom: "100px",
          borderRadius: "10px",
        }}
      >
        <Flex gap="small" vertical={true}>
          <div
            key={0}
            style={{
              backgroundColor: "#c1d8f7",
              padding: "4%",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <h4 style={{ color: "#3d8ef8" }}>Welcome to RFP System!</h4>
            <p style={{ color: "#3d8ef8" }}>Sign up to continue</p>
          </div>
          <div key={1} style={{ padding: "4%" }}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
            >
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.firstname,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.lastname,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: VALIDATION?.email?.invalid,
                  },
                  {
                    required: true,
                    message: VALIDATION?.email?.required,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.password,
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.confirmpassword?.required,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(VALIDATION?.confirmpassword?.match)
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="revenue"
                label="Revenue"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.revenue?.required,
                  },
                  {
                    pattern: /^\d+(,\d+){2,}$/,
                    message: VALIDATION?.revenue?.match,
                  },
                ]}
              >
                <Input placeholder="(Last 3 years in Lakhs)" />
              </Form.Item>

              <Form.Item
                name="numberOfEmployees"
                label="No of Employees"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.noofemployees?.required,
                  },
                  {
                    pattern: /^(?!0\d)\d*$/,
                    message: VALIDATION?.noofemployees?.match,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gstNo"
                label="GST No"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.gstno?.required,
                  },
                  {
                    pattern:
                      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: VALIDATION?.gstno?.match,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="panNo"
                label="PAN No"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.panno?.required,
                  },
                  {
                    pattern: /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: VALIDATION?.panno?.match,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phoneNo"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.phone?.required,
                  },
                  {
                    pattern: /^\d{10}$/,
                    message: VALIDATION?.phone?.match,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="category"
                label="Categories"
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

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
            </Form>
          </div>
          <p style={{ textAlign: "center" }}>Register as Admin</p>
          <p style={{ textAlign: "center" }}>Forgot password</p>
        </Flex>
      </div>
    </>
  );
};

export default VendorSignup;
