import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { post } from "../ApiHelper";

const AuthServices = {};

AuthServices.login = async (data) =>{
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.login}`;
    const reponse = await post(apiRoute, data);
    return reponse;
};

export default AuthServices;