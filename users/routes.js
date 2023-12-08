import * as userDao from "./dao.js";
import * as locationDao from "../locations/dao.js";

let currentUser = null;
function UserRoutes(app) {

  const createUser = async (req, res) => {
    try {
      const response = await userDao.createUser(req.body);
      res.json(response);
    } catch (err) {
      console.log("Encountered error with createUser");
      res.status(422).json({message: "createUser failed"});
    }
  };

  const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
  };

  const deleteUser = async (req, res) => {
    await userDao.deleteUser(req.params.userId);
  };

  const findUserById = async (req, res) => {
    await userDao.findUserById(req.params.userId);
  };


  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    userDao.updateUser(userId, req.body);
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
    currentUser = await userDao.createUser(req.body);
    // TODO: multiple ?
    // req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  
  const signin = async (req, res) => {
    console.log("signin");
    console.log(req.body);
    const {username, password} = req.body;
    const currentUser = await userDao.findUserByCredentials(username, password);
    // req.session['currentUser'] = currentUser;

    console.log(currentUser);
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
  };
  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };

  const getUserReviews = async (req, res) => {
    
  }

  app.post("/", createUser);
  app.get("/", findAllUsers);
  app.post("/signin", signin);
  app.get("/:userId", findUserById);
  app.put("/:userId", updateUser);
  app.delete("/:userId", deleteUser);
  app.get("/:userId/reviews", getUserReviews);
  app.post("/signup", signup);
  app.post("/signout", signout);
  app.post("/account", account);
}
export default UserRoutes;