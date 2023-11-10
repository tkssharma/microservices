import Controller from "interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from "express";
import postModel from "../post/post.model";
import PostNotFoundException from "../exceptions/post.exception";
import CreatePostDto from "./post.dto";
import RequestWithUser from "../interfaces/req.user";
import userModel from "../user/user.model";
import authMiddleware from "../middleware/auth.middleware";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  public user = userModel;
  public post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .get(this.path, this.getAllPosts)
      .post(this.path, authMiddleware, this.createPost);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(`${this.path}/:id`, this.updatePost)
      .delete(`${this.path}/:id`, this.deletePost);
  }

  private getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const postQuery = this.post.find();
    const posts = await postQuery.populate("author", "-password");
    res.send(posts);
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const post = await this.post.findById(id);
    if (post) {
      res.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  };

  private updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const postData: any = req.body;
    const post = await this.post.findByIdAndUpdate(id, postData, { new: true });
    if (post) {
      res.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  };

  private createPost = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const postData: any = req.body;
    console.log(req.body);
    const createPost = await this.post.create({
      content: postData.content,
      title: postData.title,
      author: req.user._id,
    });
    res.send(createPost);
  };

  private deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const post = await this.post.findByIdAndDelete(id);
    if (post) {
      res.send(post);
    } else {
      next(new PostNotFoundException(id));
    }
  };
}

export default PostController;
