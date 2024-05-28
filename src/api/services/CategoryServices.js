import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get, post } from "../ApiHelper";

// This CategoryService variable is responsible for providing all the category related APIs
const CategoryServices = {};

//service for fetching all the categories.
CategoryServices.getCategories = async () =>{
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.categories}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}

//service for adding a new category
CategoryServices.addCategory = async (data) => {
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.categories}`;
    //Making the request.
    const reponse = await post(apiRoute, data, token);
    //Returning the response recieved from the API
    return reponse;
}



export default CategoryServices;