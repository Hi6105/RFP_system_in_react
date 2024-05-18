// Constants for API response
export const API_RESPONSE_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
};

// Validation messages related constants
export const VALIDATION = {
  required: "This field is required",
  numeric : "Please enter a valid numeric value!",
  firstname: "Please input your First name!",
  lastname: "Please input your Last name!",
  passwordLength : "Password should be of 8 length minimum",
  email: {
    invalid: "The input is not valid E-mail!",
    required: "Please input your Email!",
  },
  password: "Please Input your Password!",
  newpassword: "New password is required",
  oldpassword: "Old password is required",
  otp: "OTP is required",
  confirmpassword: {
    required: "Please confirm your password!",
    match: "The password that you entered do not match!",
  },
  revenue: {
    required : "Please input the revenue!",
    match : "Please enter the revenue as(110,111,222)!",
  },
  noofemployees: {
    required : "Please input the number of employees!",
    match : "Please enter a valid numeric value!",
  },
  gstno: {
    required : "Please input the GST number!",
    match : "Please enter a valid GST number!",
  },
  panno: {
    required : "Please input the PAN number!",
    match : "Please enter a valid PAN number!",
  },
  phone: { required: "Please input the Phone number!", match: "Please enter a valid Phone number!" },
  categories: "Please select a category!",
  rfpVendorSelect : "Please select a category first!",
};
// Validation messages related key ends

// Common messages constants
export const MESSAGE = {
    wrongCredentials : "Wrong Credentials!",
    adminRegistration : "Admin Registered successfully",
    vendorRegistration : {
      success : "Vendor registered successfully",
      error : "error"
    },
    wentWrong : "Something went wrong.",
    categorySaved : "Category saved successfully",
    vendorApproved : "Vendor approved successfully",
    rfpCreated : "RFP created",
    rfpClosed : "RFP Closed successfully",
    otpSent : "An OTP has been sent on your E-Mail address",
    passwordReset : "Your Password is successfully changed!",
};

//redirection links on pages
export const PAGES = {
  dashboard : "Home",
  rfpList : "RFP List",
  addRfp : "Add RFP",
  rfpQuote : "RFP Quotes",
  vendor : "Vendor List",
  category : "Categories",
  addCategory : "Add Category",
  applyRfp : "Apply RFP",
}

// User Type Constants
export const USER_TYPE = {
  ADMIN: "admin",
  VENDOR: "vendor",
};

// Regular Expressions for patter matching and validation

export const REGEX = {
  revenue : /^\d+(,\d+){2,}$/,
  number : /^(?!0\d)\d*$/,
  gstNo : /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  panNo : /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  phoneNo : /^\d{10}$/,
  password : /^.{8,}$/,
}