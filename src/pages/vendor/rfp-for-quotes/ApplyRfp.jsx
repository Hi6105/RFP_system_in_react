import React, { useState, useEffect } from "react";
import { Form, Input, Button, Flex, message, Spin, Card, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { API_RESPONSE_TYPE, MESSAGE, PAGES } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { error, success } from "../../../helper/ToastMessages";
import RfpServices from "../../../api/services/RfpServices";
import { useSelector } from "react-redux";
import useValidation from "../../../hooks/useValidation";
import { t } from "i18next";

const ApplyRfp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [rules, setValidation] = useValidation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const rfpId = useSelector((state) => state?.rfp?.selectedRfpId);

  //setting validations in the form
  useEffect(() => {
    setValidation({
      numeric: [{ rule: "digit" }, { rule: "required" }],
    });
  }, []);

  // Function to send the data coming through the form into the API
  const onFinish = async (values) => {
    try {
      // Setting spinning loader to show
      setSpinning(true);

      // Formulating the data that would be sent into the API
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
    } catch (err) {
      // Logging the error and showing an error message
      console.error("Error applying RFP:", err);
      error(MESSAGE?.wentWrong, messageApi);
    } finally {
      // Setting spinning loader to hide
      setSpinning(false);
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
        <h1>{t("app.applyRfp")}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES.vendorDashboard}>
              {PAGES?.dashboard}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.vendorRfpList}>
              {PAGES?.rfpList}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }}>{PAGES?.applyRfp}</Link>
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
                    label={t("app.itemPrice")}
                    name="itemPrice"
                    rules={rules?.numeric}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={t("app.totalPrice")}
                    name="totalCost"
                    rules={rules?.numeric}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item>
                    <Flex justify="flex-end" gap="middle">
                      <Button type="primary" htmlType="submit">
                        {t("app.submit")}
                      </Button>
                      <Button onClick={handleCancel}>{t("app.cancel")}</Button>
                    </Flex>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </Content>
      </Spin>
    </>
  );
};

export default ApplyRfp;
