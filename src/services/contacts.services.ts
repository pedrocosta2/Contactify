import AppDataSource from "../data-source";
import { Clients } from "../entities/clients.entity";
import { AppError } from "../errors";
import { IContactRequest, IContactResponse } from "../interfaces/contacts";
import { Contacts } from "../entities/contacts.entity";
import { Request } from "express";
export const createContactService = async (req: Request): Promise<any> => {
  const contactRepo = AppDataSource.getRepository(Contacts);
  req.body.client = req.client.id;
  const contact = contactRepo.create(req.body);
  const findContact = await contactRepo.findOneBy({ email: req.body.email });
  if (findContact) {
    throw new AppError("contact already have a client affiliated", 403);
  }
  const response = await contactRepo.save(contact);
  return response;
};

export const getOneContactService = async (
  contactId: string
): Promise<IContactResponse> => {
  const contactRepo = AppDataSource.getRepository(Contacts);
  const contactQueryBuilder = contactRepo.createQueryBuilder("contacts");
  const contactAndClient = await contactQueryBuilder
    .leftJoinAndSelect("contacts.client", "client")
    .where("contacts.id = :id", { id: contactId })
    .getOne();

    const {client, ...treatedContact} = contactAndClient!
  return treatedContact ;
};

export const patchContactService = async (
  body: IContactRequest,
  contactId: string
): Promise<IContactResponse> => {
  const contactRepo = AppDataSource.getRepository(Contacts);
  const contact = contactRepo.findOneBy({ id: contactId });
  if (!contact) {
    throw new AppError("client no exist", 404);
  }
  await contactRepo.update(contactId, body);
  const updatedContact = contactRepo.create({ ...contact, ...body });
  return updatedContact;
};

export const deleteContactService = async (clientId: string) => {
  const contactsRepo = AppDataSource.getRepository(Contacts);
  const contact = await contactsRepo.findOneBy({ id: clientId });
  await contactsRepo.remove(contact!);
  return {};
};
