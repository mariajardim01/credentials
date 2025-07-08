import { error } from "console"
import httpStatus from "http-status"

export function passwordValidation(password: string){
    if (password.length < 6 ){
        throw({
            error: httpStatus.UNPROCESSABLE_ENTITY,
            message: "this password need to have at least 6 characters"
            
        })
    }
}