export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
}

export interface IContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}
