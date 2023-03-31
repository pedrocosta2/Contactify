import * as yup from "yup";

export const createContactShape = yup
  .object()
  .shape({
    name: yup.string().max(200).required("name is required"),
    email: yup
      .string()
      .email("must be a valid email")
      .max(200)
      .required("email is required"),
    phone: yup.string().required("phone is required"),
  })
  .noUnknown(true)
  .strict();

  export const updateContactShape = yup
  .object()
  .shape({
    name: yup.string().max(200),
    email: yup
      .string()
      .email("must be a valid email")
      .max(200),
    phone: yup.string(),
  })
  .noUnknown(true)
  .strict();
