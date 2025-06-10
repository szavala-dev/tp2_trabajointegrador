import { Router } from "express";

const rolesRouter = Router();

rolesRouter.get("/", (req, res) => {
  res.status(200).send ("get all rolesRouter");
});

export default rolesRouter;
