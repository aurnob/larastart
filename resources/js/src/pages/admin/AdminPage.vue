<script setup>
import { getUserData } from '../../helper/getUserData';
import { useLogoutUser } from './actions/Logout';
import NavBar from './components/NavBar.vue'

const { logout } = useLogoutUser()
const userData = getUserData()

async function logoutUser() {
    const userId = userData?.user?.id
    if (typeof userId !== 'undefined') {
        await logout(userId)
        localStorage.clear()
        setTimeout(() => window.location.href = "/login", 1000)
    }

}
</script>

<template>
    <div class="min-h-full">
        <NavBar :loggedInUserName="userData?.user.name" @logout="logoutUser"  />

        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
        </header>
        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <!-- Your content -->
            </div>
        </main>
    </div>
</template>