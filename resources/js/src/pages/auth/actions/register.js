import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";

export const registerInput = ref({
    name: '',
    email: '',
    password: ''
});

export function useRegisterUser() {
    const loading = ref(false)
    async function register() {
        try {
            loading.value = true
            const data = await makeHttpReq('register', 'POST', registerInput.value)
            loading.value = false
            registerInput.value = {}
            successMsg(data.message)
        } catch (error) {
            loading.value = false
            for (const message of error) {
                showError(message)
            }
        }
    }

    return { register, loading }
}