import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get } from "../ApiHelper";

const RfpServices = {};

RfpServices.getAllRfps = async () => {
    const token = localStorage.getItem('token');
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS.getRfps} `;
    const reponse = await get(apiRoute, token);
    return reponse;
}

export default RfpServices;