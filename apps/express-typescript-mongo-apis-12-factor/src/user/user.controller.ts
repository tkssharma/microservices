import Controller from "../interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import userModel from "./user.model";
import postModel from "../post/post.model";
import UserNotFoundException from "../exceptions/user.exception";
import RequestWithUser from "../interfaces/req.user";
import UnauthorizedException from "../exceptions/user.acces.exception";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  public user = userModel;
  public post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getUserById);
  }

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const userQuery = this.user.findById(id);
    const user = userQuery.populate("posts").exec();
    if (user) {
      res.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  };

  private getAllPostsOfUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    if (id === req.user._id) {
      const data = await this.post.find({ author: id });
      res.send(data);
    }
    next(new UnauthorizedException(id));
  };
}

export default UserController;
