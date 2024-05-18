import { useState } from "react";

/**
 * Custom method to return the validation rules for the fields
 * @returns [rules, setValidation]
 */
function useValidation() {
  /** state to store rules */
  const [rules, setRules] = useState({});

  /** Message json */
  const messages = {
    required: "This field is required",
    email: "The input is not valid E-mail!",
    password: "Length of the password must be greater than 5",
    mobile: "Enter a valid 10 digit Phone number",
    digit: "Enter a valid number",
    firstName: "First name should have charaters between 1-60",
    lastName: "Last name should have charaters between 1-60",
    revenue: "The input must be a comma-separated list of numbers (e.g., 101,13212,31)",
    gstNo: "The input is not a valid GST number",
    panNo: "The input is not a valid PAN number",
    arrayLength : "Atleast select a single option"
  };

  /**
   * The below method will return the rule object on the basis of rule name
   * @param {string} ruleName Rule name
   * @returns object
   */
  const validate = (rules, element) => {
    switch (rules.rule) {
        //case for the required fiels
      case "required":
        return {
          required: true,
          message: rules?.message || messages.required,
        };

        //case for email input
      case "email":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the value is not empty, undefined or matches the email format
            if (
              value === undefined ||
              value === "" ||
              !/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                value
              )
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

            //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(rules?.message || messages.email);
            }
          },
        };

        //case for password input
      case "password":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the password is empty, undefined or has length less than 5
            if (value === undefined || value === "" || value.length < 5) {
              isValid = false;
            } else {
              isValid = true;
            }

            //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.password);
            }
          },
        };

        //case for mobile number input
      case "mobile":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and follows the format of 10 digits
            if (
              value === undefined ||
              value === "" ||
              value.length !== 10 ||
              !/^\d{10}?$/.test(value)
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

            //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.mobile);
            }
          },
        };

        //case for numerical input
      case "digit":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and contains numerical input
            if (value === undefined || value === "" || !/^\d+$/.test(value)) {
              isValid = false;
            } else {
              isValid = true;
            }

            //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.digit);
            }
          },
        };

        //case for first name input field
      case "firstName":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and character length between 1-60
            if (
              value === undefined ||
              value === "" ||
              value.length < 1 ||
              value.length > 60
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

             //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.firstName);
            }
          },
        };

      case "lastName":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and character length between 1-60
            if (
              value === undefined ||
              value === "" ||
              value.length < 1 ||
              value.length > 60
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

             //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.lastName);
            }
          },
        };

      case "revenue":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and follows the format as three numerical values separated by commas
            if (
              value === undefined ||
              value === "" ||
              !/^(\d+)(,\d+)(,\d+)$/.test(value)
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

             //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.revenue);
            }
          },
        };

      case "gstNo":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and follows the format of valid GST number
            if (
              value === undefined ||
              value === "" ||
              !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(value)
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

             //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.gstNo);
            }
          },
        };

      case "panNo":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is not empty, undefined and follows the format of valid PAN number
            if (
              value === undefined ||
              value === "" ||
              !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
            ) {
              isValid = false;
            } else {
              isValid = true;
            }

             //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.panNo);
            }
          },
        };

        case "arrayLengthGreaterThan0":
        return {
          validator: (_, value) => {
            let isValid = false;

            //checking if the input is an array and its length is greater than 0
            if (
              typeof value === 'object' && value.length > 0
            ) {
              isValid = true;
            } else {
              isValid = false;
            }

             //return the promise based on the check
            if (isValid) {
              return Promise.resolve();
            } else {
              return Promise.reject(messages.arrayLength);
            }
          },
        };

      default:
        break;
    }
  };

  //function to set the validation rules based on the keys assigned in the hook variable
  const setValidation = (validationList) => {
    //Initialising object to store the validation rules and set it in the rules variable
    let formRules = {};

    //Looping over the rules assigned in the form
    for (let key in validationList) {
        //extracting all the rules defined for a form field
      let value = validationList[key];
      //Initialising array for response from the validation checks for each of these defined rules
      let fieldRule = [];
      //Looping over the rules assigned to validate on the recieved values
      value.forEach((element) => {
        let ruleObject;
        //storing the response from the validate function
        ruleObject = validate(element);
        fieldRule.push(ruleObject);
      });

      //storing responses for each form field validations
      formRules[key] = fieldRule;
    }

    //setting validation response in the rules state variable
    setRules((prevState) => {
      return { ...prevState, ...formRules };
    });
  };

  return [rules, setValidation];
}

export default useValidation;
