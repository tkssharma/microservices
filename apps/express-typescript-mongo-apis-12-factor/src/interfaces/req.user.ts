import User from "user/user.interface";
import { Request } from "express";

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
