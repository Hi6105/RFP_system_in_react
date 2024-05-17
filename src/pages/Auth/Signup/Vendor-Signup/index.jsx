import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { success, error } from "../../../../helper/ToastMessages";
import {
  API_RESPONSE_TYPE,
  MESSAGE,
  REGEX,
  VALIDATION,
} from "../../../../constants";
import AuthServices from "../../../../api/services/AuthServices";
import CategoryServices from "../../../../api/services/CategoryServices";
import { fetchCategories } from "../../../../helper/Fetchdata";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../config/AppConfig";

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

const VendorSignup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();
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

    // Calling the auth seyyy
    const response = await AuthServices.signUp(data);

    if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
      success(MESSAGE?.vendorRegistration?.success, messageApi);
      // Set a timeout to navigate after displaying the success message
      setTimeout(() => {
        navigate(APP_ROUTES?.login);
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    } else {
      error(response?.data?.error[0], messageApi);
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
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
                    pattern: REGEX?.revenue,
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
                    pattern: REGEX?.number,
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
                    pattern: REGEX?.gstNo,
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
                    pattern: REGEX.panNo,
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
                    pattern: REGEX?.phoneNo,
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
