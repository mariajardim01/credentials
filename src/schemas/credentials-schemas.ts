import Joi from "joi";
import { PostCredentialsType } from "../protocols/credentials-protocols";
export const postCredentialsSchema = Joi.object<PostCredentialsType>({
    password: Joi.string().required(),
    title: Joi.string().required(),
    url: Joi.string().required(),
    username: Joi.string().required()
})