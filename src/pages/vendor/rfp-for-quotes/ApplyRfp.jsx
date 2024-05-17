import React from "react";
import { Form, Input, Button, Flex, message, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  API_RESPONSE_TYPE,
  MESSAGE,
  VALIDATION,
  REGEX,
} from "../../../constants";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { error, success } from "../../../helper/ToastMessages";
import RfpServices from "../../../api/services/RfpServices";
import { useSelector } from "react-redux";

const ApplyRfp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const rfpId = useSelector((state) => state?.rfp?.selectedRfpId);

  // Function to send the data coming through the form into the API
  const onFinish = async (values) => {
    //Formulating the data that would be sent into the API
    const data = {
      item_price: values?.itemPrice,
      total_cost: values?.totalCost,
      _method: "put",
    };

    // Calling the API for applying quote for a particular RFP
    const response = await RfpServices.applyRfp(data, rfpId);

    // Based on the response of the API showing toast messages
    if (response?.data?.response === API_RESPONSE_TYPE.ERROR) {
      error(response?.data?.errors[0], messageApi);
    } else {
      success(MESSAGE?.rfpCreated, messageApi);
      // Set a timeout to navigate after displaying the success message
      setTimeout(() => {
        navigate(APP_ROUTES?.vendorRfpList);
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    }
  };

  // Function to handle redirection on cancelling the form submission
  const handleCancel = () => {
    navigate(APP_ROUTES?.vendorRfpList);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>Apply RFP</h1>
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
                onFinish={onFinish}
              >
                <Form.Item
                  label="Item Price"
                  name="itemPrice"
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
                  label="Total Cost"
                  name="totalCost"
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

export default ApplyRfp;
