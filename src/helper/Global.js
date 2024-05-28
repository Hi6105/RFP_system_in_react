import { MESSAGE } from "../constants";

//Function for generating a random string of letters and numbers
export function generateRandomString(length = 10) {
    //Defining a string of all the letters and numbers.
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //Initialising an empty resultant.
    let result = "";
    //Obtaining the length of this character string to use it in generating a random index.
    const charactersLength = characters.length;
  
    //Looping over the length of desired string.
    for (let i = 0; i < length; i++) {
      //Generating a random index.
      const randomIndex = Math.floor(Math.random() * charactersLength);
      //Appending the character at the generated index to the resultant string.
      result += characters[randomIndex];
    }
  
    //Returning the generated random string.
    return result;
  }
  
  //Function for converting an array of items into a comma separated string
  export function arrayToCommaSeparatedString(arr) {
    //Checking if the type of variable passed is indeed an array
    if (!Array.isArray(arr)) {
      throw new TypeError(MESSAGE?.notArrayType);
    }
    //Using the join function for array to convert it into a comma separated string and then returning the result.
    return arr.join(',');
  }
  