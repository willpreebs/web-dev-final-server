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

  app.post("/locations", createLocation);
  app.get("/locations", findAllLocations);
  app.get("/locations/:locationId", findLocationById);
  app.put("/locations/:locationId", updateLocation);
  app.delete("/locations/:locationId", deleteLocation);
}
export default LocationRoutes;