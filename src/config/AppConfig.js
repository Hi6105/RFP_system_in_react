
export const API_BASE_URL = "https://rfpdemo.velsof.com/api";

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
};

export const APP_ROUTES = {
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