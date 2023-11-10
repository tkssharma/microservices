import express from "express";

import { deleteUserById, getUsers, getUserById } from "../db/users";

export const getAllAPIUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const deleteUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.sendStatus(400);
  }
};

export const updateUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const user = await getUserById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    user.username = username;
    await user.save();
    return res.status(200).json(user).end();
  } catch (err) {
    return res.sendStatus(400);
  }
};
