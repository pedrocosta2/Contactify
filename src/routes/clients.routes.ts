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
//Routes
/** 
* / @swagger 
*post:
*use to criate
*response: 200

*/
clientsRouter.post(
  "/clients",
  createMiddleware(createClientShape),
  createClientController
);

clientsRouter.post("/login", loginClientMiddleware, loginClientController);

clientsRouter.get("/clients", authClientMiddleware, getClientsController);

clientsRouter.get(
  "/clients/profile",
  authClientMiddleware,
  getOneClientMiddleware,
  getOneClientController
);

clientsRouter.patch(
  "/clients/profile",
  authClientMiddleware,
  getOneClientMiddleware,
  patchClientMiddleware(updateClientShape),
  patchClientController
);

clientsRouter.delete(
  "/clients/profile",
  authClientMiddleware,
  getOneClientMiddleware,
  deleteClientController
);

export default clientsRouter;
