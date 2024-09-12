
import { LoginResponseType } from "../pages/auth/actions/login";


export function getUserData() {
    try {

        const userData = localStorage.getItem("userData");

        if (typeof userData !== 'object') {
            const connectedUser = JSON.parse(userData);
            return connectedUser
        }

    } catch (error) {
        console.log((error).message)
    }
}
