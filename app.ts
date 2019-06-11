import serverless from "serverless-http";
import express, { Request } from "express";
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";

declare global {
  namespace Express {
    export interface Request {
      context?: APIGatewayEventRequestContext;
    }
  }
}

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

export const handler = serverless(app, {
  request: (req: Request, event: APIGatewayProxyEvent, _context: Context) => {
    req.context = event.requestContext;
  },
});
