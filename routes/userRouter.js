import { Router } from "express";
import UserController from "../controllers/userController.js";

const userController = new UserController();

const userRouter = Router();


userRouter.get("/", userController.getAllUserController);
userRouter.get("/:id", userController.getUserByIdController);
userRouter.post("/", userController.createUserController);

export default userRouter;
