import * as dao from "./dao.js";
let currentUser = null;
function UserRoutes(app) {

  const createUser = async (req, res) => {
    try {
      const response = await dao.createUser(req.body);
      res.json(response);
    } catch (err) {
      console.log("Encountered error with createUser");
      res.status(422).json({message: "createUser failed"});
    }
  };

  const deleteUser = async (req, res) => { };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => { };
  const updateUser = async (req, res) => { };

  const signup = async (req, res) => {
    console.log("signup");
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      console.log("user found");
      res.status(400).json(
        { message: "Username already taken"});
      return;
    }
    currentUser = await dao.createUser(req.body);
    // TODO: multiple ?
    // req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };
  
  const signin = async (req, res) => {
    console.log("signin");
    console.log(req.body);
    const {username, password} = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    // req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const signout = (req, res) => {
    req.session.destroy();
  };
  const account = async (req, res) => {
    res.json(req.session['currentUser']);
  };

  app.post("/", createUser);
  app.get("/", findAllUsers);
  app.post("/signin", signin);
  app.get("/:userId", findUserById);
  app.put("/:userId", updateUser);
  app.delete("/:userId", deleteUser);
  app.post("/signup", signup);
  app.post("/signout", signout);
  app.post("/account", account);
}
export default UserRoutes;