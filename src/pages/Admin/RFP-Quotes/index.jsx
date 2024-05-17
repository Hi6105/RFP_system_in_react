import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Table } from "antd";
import { fetchQuotes } from "../../../helper/Fetchdata";
import { useSelector } from "react-redux";

const RfpQuotesList = () => {
  //Fetching data of RFP id and corresponding item name from the redux store.
  const rfpId = useSelector((state) => state?.rfp?.selectedRfpId);
  const itemName = useSelector((state) => state?.rfp?.selectedItemName);
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
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>RFP Quotes</h1>
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
          <h4 style={{ margin: "10px" }}>RFP Quotes</h4>
          <Table columns={columns} dataSource={quotes} />
        </div>
      </Content>
    </>
  );
};

export default RfpQuotesList;
