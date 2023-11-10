import WrongAuthTokenPassedException from "../exceptions/auth.access-token.exception";
import AuthTokenMissing from "../exceptions/auth.token.exception";
import HttpException from "../exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import RequestWithUser from "../interfaces/req.user";
import * as jwt from "jsonwebtoken";
import userModel from "../user/user.model";

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.SECRET;
    try {
      const verifyResponse = jwt.verify(cookies.Authorization, secret) as any;
      const id = verifyResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthTokenPassedException());
      }
    } catch (err) {
      next(new WrongAuthTokenPassedException());
    }
  } else {
    next(new AuthTokenMissing());
  }
}

export default authMiddleware;
