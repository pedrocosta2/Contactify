import * as yup from "yup";

export const createClientShape = yup
  .object()
  .shape({
    name: yup.string().max(200).required("name is required"),
    email: yup
      .string()
      .email("must be a valid email")
      .max(200)
      .required("email is required"),
    password: yup.string().max(200).required("password is required"),
    phone: yup.string().required("phone is required"),
  })
  .noUnknown(true)
  .strict();
