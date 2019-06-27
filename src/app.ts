import "reflect-metadata";
import serverless from "serverless-http";
import { Request, json, urlencoded } from "express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { Container } from "inversify";
import { UserService } from "./services/userService";
import { UserRepository } from "./repositories/userRepository";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/userController";

const container = new Container();
container.bind<UserService>("UserService").to(UserService);
container.bind<UserRepository>("UserRepository").to(UserRepository);

const server = new InversifyExpressServer(container);
server.setConfig(app => {
  app.use(urlencoded({ extended: false }));
  app.use(json());
});
const app = server.build();

export const handler = serverless(app, {
  request: (req: Request, event: APIGatewayProxyEvent, _context: Context) => {
    req.context = event.requestContext;
  },
});
