import express from "express";
import { random, authentication } from "../helpers/index";
import { createUser, getUserByEmail } from "../db/users";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.sendStatus(400);
    }
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("auth-cookie", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res
      .status(200)
      .json({ email: user.email, username: user.username })
      .end();
  } catch (err) {
    throw err;
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  console.log("hello");
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);

    if (existingUser) {
      return res.sendStatus(409);
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res
      .status(201)
      .json({ email: user.email, username: user.username })
      .end();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
