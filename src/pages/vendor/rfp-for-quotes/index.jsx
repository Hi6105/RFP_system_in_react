import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, Table, Tag, Spin, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { useDispatch } from "react-redux";
import { setRfpId } from "../../../redux/slices/rfpSlice";
import { getRfpByUserId } from "../../../helper/Fetchdata";
import { useTranslation } from "react-i18next";
import { PAGES } from "../../../constants";

const RfpForQuotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rfps, setRfps] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const { t } = useTranslation();
  // Defining the configuration for the columns of the rfp table.
  const columns = [
    {
      title: t("app.rfpNo"),
      dataIndex: "rfp_id",
      key: "rfp_id",
    },
    {
      title: t("app.rfpTitle"),
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: t("app.rfpLastDate"),
      dataIndex: "last_date",
      key: "last_date",
    },
    {
      title: t("app.minimumPrice"),
      dataIndex: "minimum_price",
      key: "minimum_price",
    },
    {
      title: t("app.maximumPrice"),
      dataIndex: "maximum_price",
      key: "maximum_price",
    },
    {
      title: t("app.status"),
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text === "closed" ? (
          <Tag color="red">{text}</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        ),
    },
    {
      title: t("app.action"),
      key: "action",
      dataIndex: "action",
      render: (text, record) =>
        record?.status === "open" ? (
          <Button type="link" onClick={() => handleApplyRfp(record)}>
            Apply
          </Button>
        ) : (
          ""
        ),
    },
  ];

  useEffect(() => {
    // Storing data of rfps from API fetch
    const fetchData = async () => {
      //setting spinning loader to show
      setSpinning(true);

      //fetching user id from local storage to formulate data for the API
      const userString = localStorage.getItem("user");
      const user = JSON.parse(userString);
      const userId = user?.user_id;

      const data = {
        userId: userId,
      };

      //fetching rfp made for a particular vendor
      const rfpData = await getRfpByUserId(data);
      //setting rfps in the state variable
      setRfps(rfpData);
      //setting spinning loader to hide
      setSpinning(false);
    };

    fetchData();
  }, []);

  //Function to handle redirection to quotes for a particular RFP
  const handleApplyRfp = async (record) => {
    //Setting RFP Id for the selected RFP inside redux store
    dispatch(setRfpId(record?.rfp_id));

    //Navigating to the RFP quotes page.
    navigate(APP_ROUTES?.vendorApplyRfp);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>{t("sidebar.rfpList")}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES?.vendorDashboard}>
              {PAGES?.dashboard}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.vendorRfpList}>
              {PAGES?.rfpList}
            </Link>
          </Flex>
        </div>
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
          <Flex
            style={{ margin: "10px" }}
            justify="space-between"
            align="center"
          >
            <h4>RFP</h4>
          </Flex>
          <Spin tip="Loading..." spinning={spinning}>
            <Table columns={columns} dataSource={rfps} />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default RfpForQuotes;
