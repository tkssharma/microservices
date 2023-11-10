import "dotenv/config";
import App from "./app";
import AuthenticationController from "./authentication/auth.controller";
import PostController from "./post/post.controller";
import UserController from "./user/user.controller";

const app = new App([
  new AuthenticationController(),
  new PostController(),
  new UserController(),
]);

app.listen();
