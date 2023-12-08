
import axios from "axios";
import { response } from "express";
import * as dao from "../locations/dao.js";


export async function getSearchResults(textQuery) {

    const locationBias = {
        "circle": {
            "center": {
                "latitude": 42.338,
                "longitude": -71.088
            },
            "radius": 3000
        }
    }

    const maxResultCount = 5;
    
    const request = { textQuery, locationBias, maxResultCount}
    const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API;
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

export async function findLocationsFromSearchResults(results) {
  const places = results.places;

  let locations = [];

  for (const place of places) {
    const id = place.id;
    const locationsAtPlace = await dao.findLocationsByPlaceId(id);
    if (locationsAtPlace.length) {
      locations.push(locationsAtPlace);
    }
  }

  return locations;
}