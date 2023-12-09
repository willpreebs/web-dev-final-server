import * as api from "./requestAPI.js";

function SearchRoutes(app) {

    const getSearchResults = async (req, res) => {
        const searchTerm = req.params.term;
        const searchResult = await api.getSearchResults(searchTerm);
        res.send(searchResult);
    }

    const getLocationsBySearchTerm = async (req, res) => {
        const searchTerm = req.params.term;
        const searchResult = await api.getSearchResults(searchTerm);

        const locations = await api.findLocationsFromSearchResults(searchResult);
        res.send(locations);
    }

    
    app.get("/:term", getSearchResults);
    app.get("/:term/locations", getLocationsBySearchTerm);

}
export default SearchRoutes;

