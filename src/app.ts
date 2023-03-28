import "reflect-metadata";
import "express-async-errors";
import express from "express";
import clientsRouter from "./routes/clients.routes";
import { errorHandler } from "./errors";
import contactsRouter from "./routes/contacts.routes";

const app = express();
app.use(express.json());
app.use(clientsRouter);
app.use(contactsRouter);
app.use(errorHandler);
export default app;
