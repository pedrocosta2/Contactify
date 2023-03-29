import { Request, Response } from "express";
import {
  createClientService,
  deleteClientService,
  getClientsService,
  getOneClientService,
  loginClientService,
  patchClientService,
} from "../services/clients.services";

export const createClientController = async (req: Request, res: Response) => {
  const createClient = await createClientService(req.body);
  return res.status(201).json(createClient);
};

export const loginClientController = async (req: Request, res: Response) => {
  const loginClient = await loginClientService(req.body);

  return res.status(200).json(loginClient);
};

export const getClientsController = async (req: Request, res: Response) => {
  const getClients = await getClientsService();
  return res.status(200).json(getClients);
};

export const getOneClientController = async (req: Request, res: Response) => {
  const getClient = await getOneClientService(req.params.id);
  return res.status(200).json(getClient);
};

export const patchClientController = async (req: Request, res: Response) => {
  const patchClient = await patchClientService(req.body, req.params.id);
  return res.status(200).json(patchClient);
};

export const deleteClientController = async (req: Request, res: Response) => {
  await deleteClientService(req.params.id);
  return res.status(204).send();
};
