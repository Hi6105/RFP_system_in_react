import CategoryServices from "../api/services/CategoryServices";
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
