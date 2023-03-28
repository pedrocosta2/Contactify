export interface IClientRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IClientResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface IClientLogin {
  email: string;
  password: string;
}
