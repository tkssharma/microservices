import Controller from "./interfaces/controller.interface";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import errorMiddleware from "./middleware/error.middleware";
import * as mongoose from "mongoose";
const bodyParser = require("body-parser");

class App {
  public app: express.Application;

  constructor(controller: Controller[]) {
    this.app = express();
    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controller);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT || 3002, () => {
      console.log(`application started on PORT ${process.env.PORT || 3002}`);
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
  private connectToDatabase() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default App;
