import RequestGoogleMaps from "./requestAPI.js";

function SearchRoutes(app) {

    app.get("/:term", async (req, res) => {
        const searchTerm = req.params.term;
        const searchResult = await RequestGoogleMaps(searchTerm);
        console.log(searchResult);
        res.send(searchResult);
    }); 

}
export default SearchRoutes;

