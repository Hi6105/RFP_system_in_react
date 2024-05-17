import { Flex } from "antd";
import React from "react";
import { Button, Form, Input, message } from "antd";
import {
  API_RESPONSE_TYPE,
  MESSAGE,
  REGEX,
  VALIDATION,
} from "../../../../constants";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../../../api/services/AuthServices";
import { error, success } from "../../../../helper/ToastMessages";
import { APP_ROUTES } from "../../../../config/AppConfig";

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

const AdminSignup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    //Constructing the data object for sending the data at API call.
    const data = {
      firstname: values?.firstName,
      lastname: values?.lastName,
      email: values?.email,
      password: values?.password,
      mobile: values?.phoneNo,
    };

    // Calling the auth service for registering a new admin
    const response = await AuthServices.adminSignup(data);

    if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
      success(MESSAGE?.adminRegistration, messageApi);
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

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>
            </Form>
          </div>

          <Link to="/vendorSignup">
            <p style={{ textAlign: "center" }}>Register as Vendor</p>
          </Link>
          <p style={{ textAlign: "center" }}>Forgot password</p>
        </Flex>
      </div>
    </>
  );
};

export default AdminSignup;
