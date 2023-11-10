import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import * as jwtConfig from "../config/middleware/jwtAuth";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";

const swaggerDef = require("../../swaggerDef");

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  /**
   * @description
   *  Forwards any requests to the /v1/users URI to our UserRouter
   *  Also, check if user authenticated
   * @constructs
   */
  app.use("/v1/users", jwtConfig.isAuthenticated, UserRouter);

  /**
   * @description Forwards any requests to the /auth URI to our AuthRouter
   * @constructs
   */
  app.use("/auth", AuthRouter);

  /**
   * @description
   *  If swagger.json file exists in root folder, shows swagger api description
   *  else send commands, how to get swagger.json file
   * @constructs
   */
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJSDoc({
        swaggerDefinition: swaggerDef,
        apis: [path.join(__dirname, "../../src/**/**/*.ts")],
      })
    )
  );

  /**
   * @description No results returned mean the object is not found
   * @constructs
   */
  app.use((req, res) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);
}
