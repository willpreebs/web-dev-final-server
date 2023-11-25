import Database from "../Database/index.js";
// TODO: implement mongo database


function HomeRoutes(app) {

    app.get("/home/locations", (req, res) => {
        const locations = Database.locations;
        res.send(locations);
    })

}
export default HomeRoutes;