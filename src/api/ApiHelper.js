import axios from "axios";

export const get = async (apiRoute, token) =>{
  let response;
    try {
        // Making a request to the provided API routes and authentication token
        response = await axios.get(
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
        return response;
      }
}

export const post = async (apiRoute, data, token) => {
  let response;
    try {
      // Creating the headers object
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      // Making a request to the provided API route with data and headers
      response = await axios.post(apiRoute, data, { headers });
  
      // Returning the response received from the API call
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return response;
    }
  };

  export const put = async (apiRoute, data, token) => {
    let response;
      try {
        // Creating the headers object
        const headers = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
    
        // Making a request to the provided API route with data and headers
        response = await axios.put(apiRoute, data, { headers });
    
        // Returning the response received from the API call
        return response;
      } catch (error) {
        console.error("API Error:", error);
        return response;
      }
    };