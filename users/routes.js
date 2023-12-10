import * as userDao from "./dao.js";
import * as locationDao from "../locations/dao.js";

function UserRoutes(app) {

  const createUser = async (req, res) => {

    if (req.body.role && req.body.role === "ADMIN") {
      const response = await userDao.createAdmin(req.body);
      res.send(response);
    }

    try {
      const response = await userDao.createUser(req.body);
      res.send(response);
    } catch (err) {
      console.log("Encountered error with createUser");
      res.status(422).json({message: "createUser failed"});
    }
  };

  const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers().populate('reviews');
    res.json(users);
  };

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const reviews = await locationDao.getReviewsByUserId(userId);

    for (const review of reviews) {
      let id = review._id;
      await locationDao.deleteReview(id);
    }

    res.send(await userDao.deleteUser(req.params.userId));
  };

  const findUserById = async (req, res) => {
    res.send(await userDao.findUserById(req.params.userId));
  };


  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const status = await userDao.updateUser(userId, req.body);
    const currentUser = await userDao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    console.log("signup");
    const user = await userDao.findUserByUsername(
      req.body.username);
    if (user) {
      console.log("user found");
      res.status(400).json(
        { message: "Username already taken"});
      return;
    }
    const currentUser = await userDao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  
  const signin = async (req, res) => {
    console.log("signin");
    console.log(req.body);
    const {username, password} = req.body;
    const currentUser = await userDao.findUserByCredentials(username, password);
    res.json(currentUser);
  };

  const getUserReviews = async (req, res) => {
    console.log('getUserReviews');
    const userId = req.params.userId;
    const reviews = await locationDao.getReviewsByUserId(userId);
    console.log(reviews);
    res.send(reviews);
  }

  const addFavoriteLocation = async (req, res) => {
    const userId = req.params.userId;
    const locationId = req.body.locationId;
    const result = await userDao.addFavoriteLocation(userId, locationId);
    await locationDao.addFavoritedUser(locationId, userId);
    res.send(result);
  }

  app.post("/", createUser);
  app.get("/", findAllUsers);
  app.post("/signin", signin);
  app.get("/:userId", findUserById);
  app.put("/:userId", updateUser);
  app.delete("/:userId", deleteUser);
  app.get("/:userId/reviews", getUserReviews);
  app.post("/:userId/favorite", addFavoriteLocation);
  // app.delete("/:userId/favorite/:locationId", deleteFavoriteLocation);
  app.post("/signup", signup);
  // app.post("/account", account);
}
export default UserRoutes;