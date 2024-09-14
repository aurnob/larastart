import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/register",
        name: "register",
        component: () => import("../pages/auth/AuthPage.vue"),
        children: [
            {
                path: "",
                name: "register-form",
                component: () => import("../pages/auth/RegisterPage.vue"),
            }
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../pages/auth/LoginPage.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../pages/admin/AdminPage.vue"),
        children: [
            {
                path: "",
                name: "dashboard",
                component: () => import("../pages/admin/dashboard/DashboardPage.vue"),
            },

        ],
    },


];

const router = createRouter({
    routes,
    history: createWebHistory()
});
export default router;