
import axios from "axios";
import { response } from "express";



async function RequestGoogleMaps(searchTerm) {

    // const locationRestriction = {
    //     "circle": {
    //         "center": {
    //             "latitude": 42.338,
    //             "longitude": -71.088
    //         },
    //         "radius": 3000
    //     }
    // }

    const maxResultCount = 5;
    
    const request = {
        textQuery: searchTerm,
        // locationRestriction: locationRestriction,
        maxResultCount: maxResultCount,
    }
    // const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API;
    const GOOGLE_API_KEY = "AIzaSyCBpGgfYJ0E-GXUlcEQxEZId2dysQ52dqM";
    const URL = "https://places.googleapis.com/v1/places:searchText";
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'places.displayName,places.location,places.id',
    };
    
    let responseData;

    await axios.post(URL, request, { headers: headers })
      .then(response => {
        console.log("response: " + response.data);
        responseData = response.data;
      })
      .catch(error => {
        console.log("error: " + error);      
    })

    return responseData;
} 
export default RequestGoogleMaps;