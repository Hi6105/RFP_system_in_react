import CategoryServices from "../api/services/CategoryServices";
import RfpServices from "../api/services/RfpServices";
import VendorServices from "../api/services/VendorServices";
import { API_RESPONSE_TYPE } from "../constants";

// Function for fetching all the categories
export const fetchCategories = async () => {
  try {
    // Making a request to fetch all the categories.
    const response = await CategoryServices.getCategories();

    // Returning data of categories on success response
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      return response?.data?.categories;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Function for approving a particular vendor
export const approveVendor = async (data) => {
  try {
    // Making a request to a service in order to update the status of a vendor.
    const response = await VendorServices.approveVendor(data);

    // Returning response from approve vendor API on success response
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      return response?.data?.response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error approving vendor:", error);
    return false;
  }
};

// Function for creating a new RFP
export const createRFP = async (data) => {
  try {
    // Making request to a service for creating a new RFP
    const response = await RfpServices.addRfp(data);

    // Returning response from add rfp API on success response
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      return response?.data?.response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating RFP:", error);
    return false;
  }
};

// Function for fetching quotes corresponding to a particular RFP
export const fetchQuotes = async (data) => {
  try {
    // Making request to a service for fetching all the quotes for a particular RFP
    const response = await RfpServices.getRfpQuotes(data);

    // Returning data of quotes on success response
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      return response?.data?.quotes;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
};

// Function for fetching RFPs made for a particular vendor
export const getRfpByUserId = async (data) => {
  try {
    // Making request to a service for fetching all the RFPs created for a particular vendor
    const response = await RfpServices.getRfpByUserId(data);

    // Returning data of RFPs on success response
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      return response?.data?.rfps;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching RFPs by user ID:", error);
    return [];
  }
};
