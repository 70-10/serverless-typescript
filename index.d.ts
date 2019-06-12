import { APIGatewayEventRequestContext } from "aws-lambda";

declare global {
  namespace Express {
    export interface Request {
      context: APIGatewayEventRequestContext;
    }
  }
}
