console.log(process.env.NODE_ENV);
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import App from "./app";
import AuthenticationController from "./authentication/auth.controller";
import PostController from "./post/post.controller";
import UserController from "./user/user.controller";
console.log(process.env.NODE_ENV);
const app = new App([
  new AuthenticationController(),
  new PostController(),
  new UserController(),
]);

app.listen();
