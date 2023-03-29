import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Clients } from "../entities/clients.entity";
import { Contacts } from "../entities/contacts.entity";
import { AppError } from "../errors";

export const createContactMiddlewre = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const clientEmail = req.client.email;
  const clientRepo = AppDataSource.getRepository(Clients);
  const client = await clientRepo.findOneBy({ email: clientEmail });
  if (client?.email == req.body.email) {
    throw new AppError("you cannot be your on contact", 401);
  }
  return next();
};

export const getOneContactMiddlewre = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const contactRepo = AppDataSource.getRepository(Contacts);
  const findContact = await contactRepo.findOneBy({ id: req.params.id });
  console.log(findContact)
  if (!findContact) {
    throw new AppError("contact no exist", 404);
  }
  
  const contactQueryBuilder = contactRepo.createQueryBuilder("contacts");
  const contactAndClient = await contactQueryBuilder
    .leftJoinAndSelect("contacts.client", "client")
    .where("contacts.id = :id", { id: req.params.id })
    .getOne();

  if (contactAndClient?.client.id !== req.client.id) {
    throw new AppError("you cannot access another client contacts", 403);
  }

  return next();
};
