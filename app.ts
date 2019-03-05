import serverless from "serverless-http";
import * as express from "express";
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";

interface CustomRequest extends express.Request {
  context: APIGatewayEventRequestContext;
}

const app = express();

app.get("/hello", (req: CustomRequest, res: express.Response) => {
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
  request: (req: CustomRequest, event: APIGatewayProxyEvent, _context: Context) => {
    req.context = event.requestContext;
  },
});
