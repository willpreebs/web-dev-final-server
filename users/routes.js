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

  const findAllAdmins = async (req, res) => {
    const admins = await userDao.findAllAdmins();
    res.json(admins);
  };

  const deleteAllUserReviews = async (userId) => {
    console.log("deleting all user reviews of: " + userId);

    const reviews = await locationDao.getReviewsByUserId(userId);

    for (const review of reviews) {
      let id = review._id;
      await locationDao.deleteReview(id);
    }
  }

  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    deleteAllUserReviews(userId);
    res.send(await userDao.deleteUser(req.params.userId));
  };

  const findUserById = async (req, res) => {
    res.send(await userDao.findUserById(req.params.userId));
  };

  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await userDao.findUserById(userId).lean();
    const admin = await userDao.findAdminById(userId).lean();
    console.log(user);
    console.log(admin);
    const role = req.body.role;
    var response;
    if (role && role === "ADMIN") {
      if (user) {
        console.log(user);
        try {
          response = await userDao.createAdminFromUser(user);
          deleteAllUserReviews(userId);
          const d = await userDao.deleteUser(user._id);

        } catch (err) {
          res.status(422).json({message: "Cannot convert admin into user"});
          return;
        }
      }
    }
    else if (role && role === "USER") {
      if (admin) {
        try {
        response = await userDao.createUserFromAdmin(admin);
        await userDao.deleteAdmin(admin._id);
        } 
        catch (err) {
          res.status(422).json({message: "Cannot convert user into admin"});
          return;
        }
        // console.log(await userDao.deleteAdmin(admin._id));
      }
    }
    else {
      response = await userDao.updateUser(userId, req.body);
    }
    res.json(response);
  };

  const signup = async (req, res) => {
    console.log("signup");
    const user = await userDao.findUserByUsername(req.body.username);
    const admin = await userDao.findAdminByUsername(req.body.username);
    if (user || admin) {
      console.log("user found");
      res.status(400).json(
        { message: "Username already taken"});
      return;
    }

    var currentUser;
    if (req.body.role && req.body.role === "ADMIN") {
      currentUser = await userDao.createAdmin(req.body);
    }
    else {
      currentUser = await userDao.createUser(req.body);
    }
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

  const deleteFavoriteLocation = async (req, res) => {
    const userId = req.params.userId;
    const locationId = req.params.locationId;
    const result = await userDao.removeFavoriteLocation(userId, locationId);
    await locationDao.removeFavoritedUser(locationId, userId);

    res.send(result);
  }

  const updateAdmin = async (req, res) => {
    const adminId = req.params.adminId;
    const response = await userDao.updateAdmin(adminId, req.body);
    res.send(response);
  }

  const deleteAdmin = async (req, res) => {
    const response = await userDao.deleteAdmin(req.params.adminId);
    res.send(response);
  }

  const createAdmin = async (req, res) => {
    const admin = await userDao.createAdmin(req.body);
    res.send(admin);
  }

  const findAdminById = async (req, res) => {
    const admin = await userDao.findAdminById(req.params.adminId);
    res.send(admin);
  }

  const getUserFavorites = async (req, res) => {
    const user = await userDao.findUserById(req.params.userId).populate('favorites');
    res.send(user.favorites);
  }

  app.post("/", createUser);
  app.get("/", findAllUsers);

  app.get("/admins", findAllAdmins);
  app.post("/admins", createAdmin);
  app.post("/signin", signin);
  app.post("/signup", signup);

  app.get("/:userId", findUserById);
  app.put("/:userId", updateUser);
  app.delete("/:userId", deleteUser);

  app.get("/admins/:adminId", findAdminById);
  app.put("/admins/:adminId", updateAdmin);
  app.delete("/admins/:adminId", deleteAdmin);

  app.get("/:userId/reviews", getUserReviews);

  app.get("/:userId/favorite", getUserFavorites);
  app.post("/:userId/favorite", addFavoriteLocation);
  app.delete("/:userId/favorite/:locationId", deleteFavoriteLocation)

}
export default UserRoutes;