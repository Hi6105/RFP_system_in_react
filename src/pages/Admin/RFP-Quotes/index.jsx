import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Table, Spin, Flex, Space } from "antd";
import { fetchQuotes } from "../../../helper/Fetchdata";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { PAGES } from "../../../constants";

const RfpQuotesList = () => {
  //Fetching data of RFP id and corresponding item name from the redux store.
  const rfpId = useSelector((state) => state?.rfp?.selectedRfpId);
  const itemName = useSelector((state) => state?.rfp?.selectedItemName);
  const [spinning, setSpinning] = useState(false);
  const [quotes, setQuotes] = useState([]);

  // Defining the configuration for the columns of the rfp table.
  const columns = [
    {
      title: "S.No.",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Vendor Id",
      dataIndex: "vendorId",
      key: "vendorId",
    },
    {
      title: "Vendor Price",
      dataIndex: "vendorPrice",
      key: "vendorPrice",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  useEffect(() => {
    // Storing data of quotes from API fetch
    const fetchData = async () => {
      //setting spinning loader to show.
      setSpinning(true);
      const data = [];

      //Making request to the function that calls the API for fetching quotes corresponding to particular RFP.
      const quoteData = await fetchQuotes({ rfpId: rfpId });

      //Intialising serialNumber for saving the increamented value for each record
      let serialNumber = 1;

      //Looping over the recieved quotes to formulate the data array according to the Table keys
      quoteData.map((quote) => {
        data.push({
          sNo: serialNumber,
          itemName: itemName,
          vendorId: quote?.vendor_id,
          vendorPrice: quote?.item_price,
          totalPrice: quote?.total_cost,
        });
        //Increamenting variable for each record.
        serialNumber += 1;
      });

      //Setting the formulated data into quotes variable state
      setQuotes(data);
      //setting spinning loader to hide
      setSpinning(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>RFP Quotes</h1>
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
            <Link style={{ color: "black" }}>{PAGES?.rfpQuote}</Link>
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
          <h4 style={{ margin: "10px" }}>RFP Quotes</h4>
          <Spin tip="Loading..." spinning={spinning}>
            <Table columns={columns} dataSource={quotes} />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default RfpQuotesList;
