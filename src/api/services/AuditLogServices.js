import { API_BASE_URL, API_ENDPOINTS } from "../../config/AppConfig";
import { get } from "../ApiHelper";

// This AuditLogService variable is responsible for providing all the Audit Log related APIs
const AuditLogServices = {};

//service for fetching all the audit logs.
AuditLogServices.getAudits = async () =>{
    // Retriving the authentication token from the local storage to pass it in the API call
    const token = localStorage.getItem('token');
    //Defining API route for the request
    let apiRoute = `${API_BASE_URL}/${API_ENDPOINTS?.auditLogs}`;
    //Making the request.
    const reponse = await get(apiRoute, token);
    //Returning the response recieved from the API
    return reponse;
}


export default AuditLogServices;