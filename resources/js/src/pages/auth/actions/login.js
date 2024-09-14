import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showError, successMsg } from "../../../helper/toast-notification";
import { showErrorResponse } from "../../../helper/utils";

export const loginInput = ref({
    email: '',
    password: ''
});

export const LoginResponseType = ref({
    user: {
        email: '',
        id: '',
    },
    message: '',
    isLoggedIn: '',
    token: '',
});

export function useLoginUser() {
    const loading = ref(false)
    async function login() {
        try {
            loading.value = true
            const response = await makeHttpReq('login', 'POST', loginInput.value)
            loading.value = false
            loginInput.value = {}
            successMsg(response.message)
            if (response.data.isLoggedIn) {
                localStorage.setItem('userData', JSON.stringify(response.data))
                window.location.href = "/admin"
            }
        } catch (error) {
            loading.value = false
            showErrorResponse(error)
        }
    }

    return { login, loading }
}