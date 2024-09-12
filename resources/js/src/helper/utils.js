import { showError } from "./toast-notification";

export function showErrorResponse(error) {
    if (Array.isArray(error)) {
        for (const message of error) {
            showError(message);
        }
    } else {
        showError((error).message);
    }
}