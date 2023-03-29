import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { IClientRequest } from "../interfaces/clients";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../data-source";
import { Clients } from "../entities/clients.entity";
export const createMiddleware =
  (serializer: any) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    await serializer.validate(req.body, {
      stipUnknown: true,
      abortEarly: false,
    });
    return next();
  };

export const loginClientMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const clientRepo = AppDataSource.getRepository(Clients);
  const findClient = await clientRepo.findOneBy({ email: req.body.email });
  if (!findClient) {
    throw new AppError("email or password is invalid", 400);
  }
  const passwordMatch = await compare(req.body.password, findClient!.password);
  if (!passwordMatch) {
    throw new AppError("email or password is invalid", 400);
  }
  return next();
};

export const patchClientMiddleware =
  (serializer: any) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    await serializer.validate(req.body, {
      stipUnknown: true,
      abortEarly: false,
    });

    return next();
  };

export const getOneClientMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
 
    const loggedClient = req.client;
    const clientRepo = AppDataSource.getRepository(Clients)
    const client =  await clientRepo.findOneBy({id: req.params.id})
    if(!client) {
      throw new AppError("client do not exist", 404);
    }
    if (loggedClient.id !== req.params.id) {
      throw new AppError("you cannot access another client data", 401);
    }
    return next();
};

export const authClientMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("token is required", 401);
  }
  const token = authToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      throw new AppError("token is invalid", 401);
    }
    req.client = { id: decoded.sub, email: decoded.email };
  });
  return next();
};
