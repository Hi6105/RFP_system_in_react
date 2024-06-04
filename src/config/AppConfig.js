export const API_BASE_URL = "http://142.93.223.36:3000/api";

export const API_ENDPOINTS = {
    login : "login",
    categories : "categories",
    registerVendor : "registervendor",
    registerAdmin : "registeradmin",
    forgotPassword : "forgetPassword",
    resetPassword : "confirmotpresetPassword",
    getRfps : "rfp/all",
    getVendors : "vendorlist",
    approveVendor : "approveVendor",
    createRfp : "createrfp",
    closeRfp : "rfp/closerfp",
    getQuotes : "rfp/quotes",
    getRfpByUserId : "rfp/getrfp",
    applyRfp : "rfp/apply",
    exportVendors : "exportVendors",
    uploadCategory : "uploadCategoriesViaCsv",
    auditLogs : "fetchLogs",
    getActiveCompanies : "getActiveCompanies"
};

export const APP_ROUTES = {
    auditLogs : "/auditLogs",
    login : "/login",
    vendorSignup : "/vendorSignup",
    adminSignup : "/adminSignup",
    admin : "/admin",
    adminDashboard : "/admin/dashboard",
    adminCategories : "/admin/categories",
    forgortPassword : "/forgotPassword",
    resetPassword : "/resetPassword",
    addCategory : "/admin/addCategory",
    rfpList : "/admin/rfpList",
    addRfp : "/admin/addRfp",
    vendorList : "/admin/vendorList",
    rfpQuotesList : "/admin/rfpQuotesList",
    vendorRfpList : "/vendor/rfpList",
    vendor : "/vendor",
    vendorDashboard : "/vendor/dashboard",
    vendorApplyRfp : "/vendor/applyRfp",
}