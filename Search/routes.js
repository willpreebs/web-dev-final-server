import { findLocationsFromSearchResults, getSearchResults } from "./requestAPI.js";

function SearchRoutes(app) {

    const getSearchResults = async (req, res) => {
        const searchTerm = req.params.term;
        const searchResult = await getSearchResults(searchTerm);
        res.send(searchResult);
    }

    const getLocationsBySearchTerm = async (req, res) => {
        const searchTerm = req.params.term;
        const searchResult = await getSearchResults(searchTerm);

        const locations = await findLocationsFromSearchResults(searchResult);
        res.send(locations);
    }

    
    app.get("/:term", getSearchResults);
    app.get("/:term/locations", getLocationsBySearchTerm);

}
export default SearchRoutes;

