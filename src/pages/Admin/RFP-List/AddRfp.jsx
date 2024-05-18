import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Flex,
  message,
  Select,
  Card,
  Spin,
  DatePicker,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { API_RESPONSE_TYPE, MESSAGE, PAGES } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { error, success } from "../../../helper/ToastMessages";
import {
  arrayToCommaSeparatedString,
  fetchCategories,
  generateRandomString,
} from "../../../helper/Fetchdata";
import VendorServices from "../../../api/services/VendorServices";
import RfpServices from "../../../api/services/RfpServices";
import useValidation from "../../../hooks/useValidation";

const AddRfp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState({});
  const [spinning, setSpinning] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [rules, setValidation] = useValidation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //setting validations in the form
  useEffect(() => {
    setValidation({
      required: [{ rule: "required" }],
      vendor: [{ rule: "arrayLengthGreaterThan0" }],
      numeric: [{ rule: "digit" }, { rule: "required" }],
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

  // Function to send the data coming through the form into the API
  const onFinish = async (values) => {
    //setting spinning loader to show
    setSpinning(true);
    //Fetching user data from local storage
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);

    //Formulating the data that would be sent into the API
    const data = {
      user_id: user?.user_id,
      item_name: values?.itemName,
      rfp_no: generateRandomString(), // generating a random string for rfp_no
      quantity: values?.quantity,
      last_date: values?.lastdate.toISOString(), // converting the date recieved from the form into iso format
      minimum_price: values?.minPrice,
      maximum_price: values?.maxPrice,
      categories: values?.category,
      vendors: arrayToCommaSeparatedString(values?.vendors), // converting array of vendor ids into a comma separated string
      item_description: values?.itemDescription,
    };

    // Calling the API for creating a new RFP
    const response = await RfpServices.addRfp(data);

    // Based on the response of the API showing toast messages
    if (response?.data?.response === API_RESPONSE_TYPE.ERROR) {
      error(response?.data?.errors[0], messageApi);
    } else {
      success(MESSAGE?.rfpCreated, messageApi);
      // Set a timeout to navigate after displaying the success message
      setTimeout(() => {
        navigate(APP_ROUTES?.rfpList);
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    }
    //setting spinning loader to hide
    setSpinning(false);
  };

  // Function to handle redirection on cancelling the form submission
  const handleCancel = () => {
    navigate(APP_ROUTES?.rfpList);
  };

  // Function to update the vendor list in the form upon selecting a specific category
  const handleChange = async (value) => {
    // Calling the API for fetching vendor data belonging to a specific category
    const response = await VendorServices?.getVendorByCategoryId({
      categoryId: value,
    });

    // On success response from the API setting vendors data into the vendor state in the appropriate format
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      const vendorsData = response?.data?.vendors;
      let vendorData = [];

      //Looping over the recived vendor data and extracting name and id of individual vendor
      if (vendorsData) {
        vendorsData.map((vendor) => {
          //Pushing data into vendorData array
          vendorData.push({
            label: vendor?.name,
            value: vendor?.user_id,
          });
        });
      }

      // Setting the data into vendor state
      setVendors(vendorData);
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>RFP Create</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminDashboard}>
              {PAGES?.dashboard}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.rfpList}>
              {PAGES?.rfpList}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }}>{PAGES?.addRfp}</Link>
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
                    label="Select Category"
                    name="category"
                    rules={rules?.required}
                  >
                    <Select onChange={handleChange}>
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
                    rules={rules?.required}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Item Description"
                    name="itemDescription"
                    rules={rules?.required}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={rules?.numeric}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Last Date"
                    name="lastdate"
                    rules={rules?.required}
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    label="Minimum Price"
                    name="minPrice"
                    rules={rules.numeric}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Maximum Price"
                    name="maxPrice"
                    rules={rules.numeric}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Vendors"
                    name="vendors"
                    rules={rules?.vendor}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                      }}
                      placeholder="Please select"
                      options={vendors}
                    />
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
      </Spin>
    </>
  );
};

export default AddRfp;
