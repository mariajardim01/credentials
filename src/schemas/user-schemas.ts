import Joi from "joi";
import { PostUserType, SignUserType } from "../protocols/user-protocols";

export const postUserSchema = Joi.object<PostUserType>({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const signUserSchema = Joi.object<SignUserType>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})