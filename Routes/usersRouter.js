const {Router} = require("express")
const userController = require("../Controller/usersController");

const router = Router();

router.get("/getUsers",userController.getAllUsers);
router.post("/createNewUser",userController.saveNewUser);
router.delete("/deleteUser/:id",userController.deleteUser);
router.put("/updateUser/:id",userController.updateUser);

module.exports = router;