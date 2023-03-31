import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  getClientsController,
  getOneClientController,
  loginClientController,
  patchClientController,
} from "../controllers/clients.controllers";
import {
  authClientMiddleware,
  createMiddleware,
  getOneClientMiddleware,
  loginClientMiddleware,
  patchClientMiddleware,
} from "../midllewares/clients.middlewares";
import { createClientShape, updateClientShape } from "../schemas/clients.schemas";

const clientsRouter = Router();

clientsRouter.post(
  "/clients",
  createMiddleware(createClientShape),
  createClientController
);

clientsRouter.post("/login", loginClientMiddleware, loginClientController);

clientsRouter.get("/clients", authClientMiddleware, getClientsController);

clientsRouter.get(
  "/clients/:id",
  authClientMiddleware,
  getOneClientMiddleware,
  getOneClientController
);

clientsRouter.patch(
  "/clients/:id",
  authClientMiddleware,
  getOneClientMiddleware,
  patchClientMiddleware(updateClientShape),
  patchClientController
);

clientsRouter.delete(
  "/clients/:id",
  authClientMiddleware,
  getOneClientMiddleware,
  deleteClientController
);

export default clientsRouter;
