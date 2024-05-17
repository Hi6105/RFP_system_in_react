import CategoryServices from "../api/services/CategoryServices";
import RfpServices from "../api/services/RfpServices";
import VendorServices from "../api/services/VendorServices";
import { API_RESPONSE_TYPE } from "../constants";

export const fetchCategories = async () => {
  const response = await CategoryServices.getCategories();

  // Returning data of categories on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.categories;
  } else {
    return [];
  }
};

export const approveVendor = async (data) => {
  const response = await VendorServices.approveVendor(data);

  // Returning response from approve vendor API on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.response;
  } else {
    return false;
  }
};

export const createRFP = async (data) => {
  const response = await RfpServices.addRfp(data);

  // Returning response from add rfp API on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.response;
  } else {
    return false;
  }
};

export const fetchQuotes = async (data) => {
  const response = await RfpServices.getRfpQuotes(data);

  // Returning data of categories on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.quotes;
  } else {
    return [];
  }
};

export function generateRandomString(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  return result;
}

export function arrayToCommaSeparatedString(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input should be an array');
  }
  return arr.join(',');
}