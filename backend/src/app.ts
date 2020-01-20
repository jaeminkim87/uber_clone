import cors from "cors";
import { NextFunction, Request, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: req => {
        return {
          req: req.request
        };
      }
    });
    this.middleWares();
  }
  private middleWares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = request.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        request.user = user;
      } else {
        request.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
