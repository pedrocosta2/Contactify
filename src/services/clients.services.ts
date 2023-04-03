import AppDataSource from "../data-source";
import { Clients } from "../entities/clients.entity";
import { AppError } from "../errors";
import {
  IClientLogin,
  IClientRequest,
  IClientResponse,
} from "../interfaces/clients";
import jwt from "jsonwebtoken";
import { request } from "express";
import { Contacts } from "../entities/contacts.entity";
import { hash } from "bcryptjs";
export const createClientService = async (
  body: IClientRequest
): Promise<IClientResponse> => {
  const clientRepo = AppDataSource.getRepository(Clients);
  const client = clientRepo.create(body);
  const findclient = await clientRepo.findOneBy({ email: body.email });
  if (findclient) {
    throw new AppError("client already exist", 409);
  }
  const response = await clientRepo.save(client);
  const { password, ...treatedClient } = response;
  return treatedClient;
};

export const loginClientService = async (body: IClientLogin) => {
  const clientRepo = AppDataSource.getRepository(Clients);
  const findclient = await clientRepo.findOneBy({ email: body.email });
  const { id, email } = findclient!;
  const createToken = jwt.sign(
    { id, email },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: id,
    }
  );
  return {
    token: createToken,
  };
};

export const getClientsService = async (): Promise<IClientResponse[]> => {
  const clientRepo = AppDataSource.getRepository(Clients);
  const clientQueryBuilder = clientRepo.createQueryBuilder("clients");
  const ClientsContacts = await clientQueryBuilder
    .leftJoinAndSelect("clients.contacts", "client")
    .getMany();
  const treatedData = ClientsContacts.map((element) => {
    const { password, ...newBody } = element;
    return newBody;
  });

  return treatedData;
};

export const getOneClientService = async (
  clientId: string
): Promise<IClientResponse> => {
  const clientRepo = AppDataSource.getRepository(Clients);
  const clientQueryBuilder = clientRepo.createQueryBuilder("clients");
  const ClientsContacts = await clientQueryBuilder
    .leftJoinAndSelect("clients.contacts", "client")
    .where("clients.id = :id", { id: clientId })
    .getOne();
  if (!ClientsContacts) {
    throw new AppError("client no exist", 404);
  }
  return ClientsContacts;
};

export const patchClientService = async (
  body: IClientRequest,
  clientId: string
): Promise<IClientResponse> => {
  const clientRepo = AppDataSource.getRepository(Clients);
  const client = clientRepo.findOneBy({ id: clientId });
  if (!client) {
    throw new AppError("client no exist", 404);
  }
  if(body.password) {
    body.password =  await hash(body.password, 10)
  }
  
  await clientRepo.update(clientId, body);
   const findClient = await clientRepo.findOneBy({id:clientId})
  const { password, ...treatedClient } = findClient!;
  
  return treatedClient;
};

export const deleteClientService = async (clientId: string) => {
  const clientRepo = AppDataSource.getRepository(Clients);
  
  const client = await clientRepo.findOneBy({ id: clientId });
  const pedro = await clientRepo.remove(client!);
  return {};
};
