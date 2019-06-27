import { Request, Response } from "express";
import { controller, httpGet, request, response, httpPost, interfaces } from "inversify-express-utils";
import { inject } from "inversify";
import { UserService } from "../services/userService";

@controller("/users")
export class UserController implements interfaces.Controller {
  constructor(@inject("UserService") private userService: UserService) {}

  @httpGet("/")
  public async getUsers(@request() req: Request, @response() res: Response) {
    const users = await this.userService.findAll();
    return res.json({ users });
  }

  @httpPost("/")
  public async createUser(@request() req: Request, @response() res: Response) {
    const user = await this.userService.createAsync({ id: Number(req.body.id), name: req.body.name });
    return res.json(user);
  }

  @httpGet("/:id")
  public async getUser(@request() req: Request, @response() res: Response) {
    const user = await this.userService.findById(Number(req.params.id));

    if (!user) {
      return res.status(404).end();
    }

    return user;
  }
}
