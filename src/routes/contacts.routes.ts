import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  getOneContactController,
  patchContactController,
} from "../controllers/contacts.controllers";
import { createMiddleware } from "../midllewares/clients.middlewares";
import { createClientShape } from "../schemas/clients.schemas";
import { createContactShape } from "../schemas/contacts.schemas";
import { authClientMiddleware } from "../midllewares/clients.middlewares";
import {
  createContactMiddlewre,
  getOneContactMiddlewre,
} from "../midllewares/contacts.middlewres";

const contactsRouter = Router();

contactsRouter.post(
  "/contacts",
  authClientMiddleware,
  createMiddleware(createContactShape),
  createContactMiddlewre,
  createContactController
);

contactsRouter.get(
  "/contacts/:id",
  authClientMiddleware,
  getOneContactMiddlewre,
  getOneContactController
);

contactsRouter.patch(
  "/contacts/:id",
  authClientMiddleware,
  getOneContactMiddlewre,
  createMiddleware(createContactShape),
  patchContactController
);

contactsRouter.delete(
  "/contacts/:id",
  authClientMiddleware,
  getOneContactMiddlewre,
  deleteContactController
);

export default contactsRouter;
