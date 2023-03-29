import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  getOneContactService,
  patchContactService,
} from "../services/contacts.services";

export const createContactController = async (req: Request, res: Response) => {
  const createContact = await createContactService(req);

  return res.status(201).json(createContact);
};

export const getOneContactController = async (req: Request, res: Response) => {
  const patchContact = await getOneContactService(req.params.id);
  return res.status(200).json(patchContact);
};

export const patchContactController = async (req: Request, res: Response) => {
  const patchContact = await patchContactService(req.body, req.params.id);
  return res.status(200).json(patchContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(req.params.id);
  return res.status(204).send();
};
