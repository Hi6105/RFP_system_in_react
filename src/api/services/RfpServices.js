import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get, post, put } from "../ApiHelper";

// This CategoryService variable is responsible for providing all the category related APIs
const RfpServices = {};

//service for fetching all the RFPs.
RfpServices.getAllRfps = async () => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getRfps}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for creating a new RFP
RfpServices.addRfp = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.createRfp}`;
    //Making the request.
    const reponse = await post(apiRoute, data, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for updating the status of an RFP
RfpServices.closeRfp = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.closeRfp}/${data.rfpId}`;
    //Making the request.
    const reponse = await put(apiRoute, data, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for getting quotes corresponding to an RFP
RfpServices.getRfpQuotes = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getQuotes}/${data?.rfpId}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for fetching RFPs made for a particular vendor
RfpServices.getRfpByUserId = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getRfpByUserId}/${data?.userId}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for applying quote corresponding to a particular RFP
RfpServices.applyRfp = async (data, rfpId) => {
     // Retriving the authentication token from the local storage to pass it in the API call
     const token = localStorage.getItem('token');
     //Defining API route for the request
     let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.applyRfp}/${rfpId}`;
     //Making the request.
     const reponse = await post(apiRoute, data, token);
     //Returning the response recieved from the API
     return reponse;
}

export default RfpServices;