import express from "express";
import {  deleteUser, signgin,   signup,  singOut, updateUser } from "../controllers/auth.controller.js";
import {  asigngin, asignup, ddeleteUser, dupdateUser} from "../controllers/admin.controller.js";



const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.put("/update/:userId", updateUser);
route.delete("/delete/:userId", deleteUser)
route.post("/signout", singOut);




route.post("/asignup", asignup);
route.post("/asignin", asigngin)
route.put("/dupdate/:userId", dupdateUser);
route.delete("/ddelete/:userId", ddeleteUser)







export default route;
