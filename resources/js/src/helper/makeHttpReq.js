
import { getUserData } from "./getUserData";

const apiBaseURL = 'http://127.0.0.1:8000/api';

export function makeHttpReq(endpoint, verb, input) {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = getUserData()
            const res = await fetch(`${apiBaseURL}/${endpoint}`, {
                method: verb,
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + userData?.token
                },
                body: JSON.stringify(input)
            });

            const data = await res.json();

            if (!res.ok) {
                reject(data)
            }
            resolve(data)

        } catch (error) {
            reject(error);
        }
    });
}