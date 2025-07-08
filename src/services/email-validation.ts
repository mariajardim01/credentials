import { error } from "console";
import httpStatus from "http-status";

export function emailValidation(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw ({
      error: httpStatus.UNPROCESSABLE_ENTITY,
      message: "Formato de e-mail inválido",
    });
  }
}
