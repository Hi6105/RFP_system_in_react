import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get, post } from "../ApiHelper";

// This service variable is responsible for providing all the API calls related to vendor functionality
const VendorServices = {};

//service for fetching all the vendors
VendorServices.getAllVendors = async () => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getVendors}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for approving a particular vendor
VendorServices.approveVendor = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.approveVendor} `;
    //Making the request.
    const reponse = await post(apiRoute, data, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for fetching all the vendor belonging to a particular category.
VendorServices.getVendorByCategoryId = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getVendors}/${data?.categoryId}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}

export default VendorServices;