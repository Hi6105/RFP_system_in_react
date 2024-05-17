import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { post } from "../ApiHelper";

//This Auth variable is defined to contain all the authentication related services.
const AuthServices = {};

//Login auth service for authenticating user credentials
AuthServices.login = async (data) =>{
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.login}`;

    //Making the request.
    const reponse = await post(apiRoute, data);

    //Returning the response recieved from the API
    return reponse;
};


//SignUp service to register a new vendor
AuthServices.signUp = async (data) => {
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.registerVendor}`;

    //Making the request.
    const reponse = await post(apiRoute, data);

    //Returning the response recieved from the API
    return reponse;
}

//Signup service to register a new admin
AuthServices.adminSignup = async (data) =>{
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.registerAdmin}`;

    //Making the request.
    const reponse = await post(apiRoute, data);

    //Returning the response recieved from the API
    return reponse;
}

//auth service for sending otp for resetting password
AuthServices.forgotPassword = async (data) => {
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.forgotPassword}`;

    //Making the request.
    const reponse = await post(apiRoute, data);

    //Returning the response recieved from the API
    return reponse;
}

//auth service for updating password 
AuthServices.resetPassword = async (data) => {
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.resetPassword}`;

    //Making the request.
    const reponse = await post(apiRoute, data);

    //Returning the response recieved from the API
    return reponse;
}

export default AuthServices;