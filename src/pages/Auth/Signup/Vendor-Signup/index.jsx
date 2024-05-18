import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { success, error } from "../../../../helper/ToastMessages";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../../constants";
import AuthServices from "../../../../api/services/AuthServices";
import { fetchCategories } from "../../../../helper/Fetchdata";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../config/AppConfig";
import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import useValidation from "../../../../hooks/useValidation";

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
  const [spinning, setSpinning] = useState(false);
  const [rules, setValidation] = useValidation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  //setting validations in the form
  useEffect(() => {
    setValidation({
      email: [{ rule: "required" }, { rule: "email" }],
      password: [{ rule: "required" }, { rule: "password" }],
      firstName: [{ rule: "firstName" }],
      lastName: [{ rule: "lastName" }],
      revenue: [{ rule: "required" }, { rule: "revenue" }],
      gstNo: [{ rule: "required" }, { rule: "gstNo" }],
      panNo: [{ rule: "required" }, { rule: "panNo" }],
      required: [{ rule: "required" }],
      numberOfEmployees: [{ rule: "required" }, { rule: "digit" }],
      phoneNumber: [{ rule: "required" }, { rule: "mobile" }],
    });
  }, []);

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
    //setting spinning loader to show
    setSpinning(true);
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
    //setting spinning loader to hide
    setSpinning(false);
  };

  const changeLanguage = (lng) => {
    console.log(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          padding: "10px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button type="primary" onClick={() => changeLanguage("en")}>
          EN
        </Button>
        <Button type="primary" onClick={() => changeLanguage("fr")}>
          FR
        </Button>
      </div>
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
        <Spin tip="Loading..." spinning={spinning}>
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
              <h4 style={{ color: "#3d8ef8" }}>
                {t("app.dashboardGreeting")}!
              </h4>
              <p style={{ color: "#3d8ef8" }}>{t("app.signup")}</p>
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
                  rules={rules?.firstName}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={rules?.lastName}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="email" label="E-mail" rules={rules?.email}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={rules?.password}
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
                      message: VALIDATION?.required,
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
                  rules={rules?.revenue}
                >
                  <Input placeholder="(Last 3 years in Lakhs)" />
                </Form.Item>

                <Form.Item
                  name="numberOfEmployees"
                  label="No of Employees"
                  rules={rules?.numberOfEmployees}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="gstNo" label="GST No" rules={rules?.gstNo}>
                  <Input />
                </Form.Item>

                <Form.Item name="panNo" label="PAN No" rules={rules?.panNo}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="phoneNo"
                  label="Phone Number"
                  rules={rules?.phoneNumber}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Categories"
                  rules={rules?.required}
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
            <Link to="/adminSignup">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <LockOutlined />
                <p style={{ textAlign: "center" }}>{t("app.registerAdmin")}</p>
              </div>
            </Link>
            <Link to="/forgotPassword">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <LockOutlined />
                <p style={{ textAlign: "center" }}>{t("app.forgotPassword")}</p>
              </div>
            </Link>
          </Flex>
        </Spin>
      </div>
    </>
  );
};

export default VendorSignup;
