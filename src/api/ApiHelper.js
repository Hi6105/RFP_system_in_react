import axios from "axios";

export const get = async (apiRoute, token) =>{
    try {
        // Making a request to the provided API routes and authentication token
        const response = await axios.get(
          apiRoute,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Returning the response recieved from the API call 
        return response;
      } catch (error) {
        console.error("API Error:", error);
      }
}

export const post = async (apiRoute, data, token) => {
    console.log(data);
    try {
      // Creating the headers object
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      // Making a request to the provided API route with data and headers
      const response = await axios.post(apiRoute, data, { headers });
  
      // Returning the response received from the API call
      return response;
    } catch (error) {
      console.error("API Error:", error);
      // Optional: rethrow the error if you want the calling function to handle it
      throw error;
    }
  };