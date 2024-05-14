// Constants for API response
export const API_RESPONSE_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
};

// Validation messages related constants
export const VALIDATION = {
  required: "This field is required",
  firstname: "Please input your First name!",
  lastname: "Please input your Last name!",
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
};
// Validation messages related key ends

// Common messages constants
export const MESSAGE = {
    wrongCredentials : "Wrong Credentials!",
    vendorRegistration : {
      success : "Vendor registered successfully",
      error : "error"
    },
    wentWrong : "Something went wrong."
};

// User Type Constants
export const USER_TYPE = {
  ADMIN: "admin",
  VENDOR: "vendor",
};
