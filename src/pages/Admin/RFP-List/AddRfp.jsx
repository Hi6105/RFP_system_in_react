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
import { error, success } from "../../../helper/ToastMessages";
import {
  arrayToCommaSeparatedString,
  fetchCategories,
  generateRandomString,
} from "../../../helper/Fetchdata";
import VendorServices from "../../../api/services/VendorServices";
import RfpServices from "../../../api/services/RfpServices";

const AddRfp = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState({});
  const [vendors, setVendors] = useState([]);
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

  // Function to send the data coming through the form into the API
  const onFinish = async (values) => {
    //Fetching user data from local storage
    const user = localStorage.getItem("user");

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
    }
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
      vendorsData.map((vendor) => {
        //Pushing data into vendorData array
        vendorData.push({
          label: vendor?.name,
          value: vendor?.user_id,
        });
      });

      // Setting the data into vendor state
      setVendors(vendorData);
    }
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>RFP Create</h1>
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
                  label="Select Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.categories,
                    },
                  ]}
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

                <Form.Item
                  label="Vendors"
                  name="vendors"
                  rules={[
                    {
                      required: vendors.length > 0 ? false : true,
                      message: VALIDATION?.rfpVendorSelect,
                    },
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                  ]}
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
    </>
  );
};

export default AddRfp;
