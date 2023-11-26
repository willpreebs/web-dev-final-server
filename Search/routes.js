import RequestGoogleMaps from "./requestAPI.js";

function SearchRoutes(app) {

    app.get("/search/:term", (req, res) => {
        const searchTerm = req.params.term;
        const searchResult = RequestGoogleMaps(searchTerm);
        res.send(searchResult);
    }); 
}
export default SearchRoutes;