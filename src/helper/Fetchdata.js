import CategoryServices from "../api/services/CategoryServices";
import RfpServices from "../api/services/RfpServices";
import VendorServices from "../api/services/VendorServices";
import { API_RESPONSE_TYPE } from "../constants";

//Function for fetching all the categories
export const fetchCategories = async () => {
  //Making a request to fetch all the categories.
  const response = await CategoryServices.getCategories();

  // Returning data of categories on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.categories;
  } else {
    return [];
  }
};

//Funtion for approving a particular vendor
export const approveVendor = async (data) => {
  //Making a request to a service in order to update the status of a vendor.
  const response = await VendorServices.approveVendor(data);

  // Returning response from approve vendor API on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.response;
  } else {
    return false;
  }
};

//Function for creating a new RFP
export const createRFP = async (data) => {
  //Making request to a service for creating a new RFP
  const response = await RfpServices.addRfp(data);

  // Returning response from add rfp API on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.response;
  } else {
    return false;
  }
};

//Function for fetching quotes corresponding to a particular RFP
export const fetchQuotes = async (data) => {
  //Making request to a service for fetching all the quotes for a particular RFP
  const response = await RfpServices.getRfpQuotes(data);

  // Returning data of categories on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.quotes;
  } else {
    return [];
  }
};

//Function for generating a random string of letters and numbers
export function generateRandomString(length = 10) {
  //Defining a string of all the letters and numbers.
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //Initialising an empty resultant.
  let result = "";
  //Obtaining the length of this character string to use it in generating a random index.
  const charactersLength = characters.length;

  //Looping over the length of desired string.
  for (let i = 0; i < length; i++) {
    //Generating a random index.
    const randomIndex = Math.floor(Math.random() * charactersLength);
    //Appending the character at the generated index to the resultant string.
    result += characters[randomIndex];
  }

  //Returning the generated random string.
  return result;
}

//Function for converting an array of items into a comma separated string
export function arrayToCommaSeparatedString(arr) {
  //Checking if the type of variable passed is indeed an array
  if (!Array.isArray(arr)) {
    throw new TypeError('Input should be an array');
  }
  //Using the join function for array to convert it into a comma separated string and then returning the result.
  return arr.join(',');
}

//Function for fetching RFPs made for a particular vendor
export async function getRfpByUserId(data){
  //Making request to a service for fetching all the RFPs created for a particular vendor
  const response = await RfpServices.getRfpByUserId(data);
  
  // Returning data of categories on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    return response?.data?.rfps;
  } else {
    return [];
  }
}