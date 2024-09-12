import { useToast } from "vue-toast-notification";

const toast = useToast();

export function showError(message) {
    toast.error(message, {
        position: 'top-right',
        duration: 4000,
        dismissible: true,
    });
}



export function successMsg(message) {
    toast.success(message, {
        position: 'top-right',
        duration: 4000,
        dismissible: true,
    });
}