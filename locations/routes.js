import * as dao from "./dao.js";
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
    res.send(ret);
  };
  const findLocationsByPlaceId = async (req, res) => {
    const placeId = req.params.placeId;
    res.send(await dao.findLocationsByPlaceId(placeId));
  }

  const getLocationDetails = async (req, res) => {
    console.log("Getting location details");
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId);
    const detailsId = location.details;
    if (detailsId) {
      const details = await dao.findDetailsById(detailsId);
      res.send(details);
    } 
    else {
      res.status(404).json({message: "No details for this location"});
    }
  }

  const getLocationReviews = async (req, res) => {
    const locationId = req.params.locationId;
    const reviews = await dao.getReviewsByLocation(locationId);
    res.send(reviews);
  }

  const addReviewToLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId);
    const review = req.body;
    if (location.details) {
      // console.log("location details: " + location.details);
      console.log(location.details._id);
      const details = await dao.addReviewToDetails(location.details._id, {...review, location: locationId});
      res.send(details);
    }
    else if (location) {
      // console.log(location);
      const details = await dao.createDetailsFromFirstReview(review);
      const location = await dao.updateLocation(locationId, {...location, details: details._id});
      res.send(details);
    }
    else {
      // console.log("Location doesn't exist");
      res.status(404).json({message: "Location does not exist"});
      return;
    }
  }

  const updateLocationDetails = async (req, res) => {
    console.log(req.body);
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId);
    if (location.details) {
      const details = await dao.updateDetails(location.details._id, req.body);
      res.send(details);
    }
    else {
      res.status(404).json({message: "details not found"});
    }
  }

  const deleteDetails = async (req, res) => {

  }

  const createLocationDetails = async (req, res) => {
    const locationId = req.params.locationId;
    const location = await dao.findLocationById(locationId); // .details;
    if (location.details) {
      res.status(422).json({
        message: "Details already exist for this location"
      })
      return;
    }
    const details = await dao.createDetails({...req.body, location: locationId});
    console.log(details);
    await dao.addDetailsToLocation(locationId, details);
    res.send(details);
  }

  app.post("/", createLocation);
  app.get("/", findAllLocations);

  app.get("/:locationId/details", getLocationDetails);
  app.put("/:locationId/details", updateLocationDetails);
  app.post("/:locationId/details", createLocationDetails);
  app.delete("/:locationId/details", deleteDetails);

  app.post("/:locationId/reviews", addReviewToLocation);
  app.get("/:locationId/reviews", getLocationReviews);

  app.post(":/locationId", createLocation)
  app.get("/:locationId", findLocationById);
  app.put("/:locationId", updateLocation);
  app.delete("/:locationId", deleteLocation);

  app.get("/place/:placeId", findLocationsByPlaceId);
}
export default LocationRoutes;