import * as dao from "./dao.js";
import { reviewModel } from "./details/model.js";
// let currentLocation = null;
function LocationRoutes(app) {
  const createLocation = async (req, res) => {
    const location = req.body;
    res.send(await dao.createLocation(location));
  };
  const deleteLocation = async (req, res) => {
    const locationId = req.params.locationId;
    await dao.deleteLocation(locationId);
  };
  const findAllLocations = async (req, res) => {
    const locations = await dao.findAllLocations();
    console.log(locations);
    res.send(locations);
  };
  const findLocationById = async (req, res) => {
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId);
    res.send(location);
  };
  const updateLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const location = req.body;
    const ret = await dao.updateLocation(locationId, location);
  };
  const findLocationsByPlaceId = async (req, res) => {
    const placeId = req.params.placeId;
    res.send(await dao.findLocationsByPlaceId(placeId));
  }

  const getlocationDetails = async (req, res) => {
    console.log("Getting location details");
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId);
    const detailsId = location.details;
    if (detailsId) {
      const details = await dao.findDetailsById(detailsId);
      res.send(details);
    } else {
      res.status(404).json({message: "No details for this location"});
    }
  }

  const addReviewToLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId);
    if (location.details) {
      console.log("location details: " + location.details);
      const details = await dao.addReviewToDetails(location.details, {...req.body, location: locationId});
      res.send(details);
    }
    else if (location) {
      console.log(location);
      const details = await dao.addNewDetails(req.params.locationId, {...req.body, location: locationId});
      res.send(details);
    }
    else {
      console.log("Location doesn't exist");
    }
  }

  app.post("/", createLocation);
  app.get("/", findAllLocations);
  app.get("/:locationId/details", getlocationDetails);
  app.post("/:locationId/details", addReviewToLocation);
  app.get("/:locationId", findLocationById);
  app.put("/:locationId", updateLocation);
  app.delete("/:locationId", deleteLocation);
  app.get("/place/:placeId", findLocationsByPlaceId);
}
export default LocationRoutes;