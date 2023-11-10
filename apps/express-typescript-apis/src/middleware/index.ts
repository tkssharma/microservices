import { getUserBySessionToken } from "../db/users";
import express from "express";

export const isAuthenticated = async (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["auth-cookie"];
    console.log(sessionToken);

    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(403);
    }
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
