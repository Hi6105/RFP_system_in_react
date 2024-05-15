import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get } from "../ApiHelper";

const VendorServices = {};

VendorServices.getAllVendors = async () => {
    const token = localStorage.getItem('token');
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getVendors} `;
    const reponse = await get(apiRoute, token);
    return reponse;
}

export default VendorServices;