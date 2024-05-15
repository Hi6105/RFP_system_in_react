import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get, post } from "../ApiHelper";

const CategoryServices = {};

CategoryServices.getCategories = async () =>{
    const token = localStorage.getItem('token');
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.categories}`;
    const reponse = await get(apiRoute, token);
    return reponse;
}

CategoryServices.addCategory = async (data) => {
    const token = localStorage.getItem('token');
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.categories}`;
    const reponse = await post(apiRoute, data, token);
    return reponse;
}

export default CategoryServices;