import serverless from "serverless-http";
import express, { Request } from "express";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

import user from "./routes/users";

const app = express();

app.get("/hello", (req, res) => {
  return res.json({
    input: {
      headers: req.headers,
      body: req.body,
      context: req.context,
      method: req.method,
      params: req.params,
      path: req.path,
    },
  });
});

app.use("/users", user);

export const handler = serverless(app, {
  request: (req: Request, event: APIGatewayProxyEvent, _context: Context) => {
    req.context = event.requestContext;
  },
});
