import express from "express";

import { getAllAPIUsers, deleteUsers, updateUsers } from "../controller/users";
import { isAuthenticated } from "../middleware";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllAPIUsers);
  router.delete("/users/:id", isAuthenticated, deleteUsers);
  router.patch("/users/:id", isAuthenticated, updateUsers);
};
