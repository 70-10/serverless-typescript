import express from "express";
import * as Users from "../repositories/users";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await Users.findAll();
  return res.send({ users });
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await Users.findById(id);
  if (!user) {
    return res.status(404).send({ message: "Not found user." });
  }
  return res.send(user);
});

export default router;
