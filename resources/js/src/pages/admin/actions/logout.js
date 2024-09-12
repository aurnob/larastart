import { ref } from "vue";
import { makeHttpReq } from "../../../helper/makeHttpReq";
import { showErrorResponse } from "../../../helper/utils";

export function useLogoutUser() {
    const loading = ref(false)
    async function logout(userId) {
        try {
            loading.value = true
            const data = await makeHttpReq('logout', 'POST', { userId })
            loading.value = false
        } catch (error) {
            console.log(error)
            showErrorResponse(error)
            if (error.message == 'Not authenticated') {
                window.location.href = "/login"
            }
            loading.value = false
        }
    }

    return { logout, loading }
}