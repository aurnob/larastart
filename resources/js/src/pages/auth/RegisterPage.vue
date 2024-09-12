<script setup>
import { registerInput, useRegisterUser } from "./actions/register";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import Error from "../../components/Error.vue";
import BaseInput from "../../components/BaseInput.vue";
import BaseButton from "../../components/BaseButton.vue";

const inputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"; 
const buttonClass = "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

const rules = {
    name: { required },
    email: { required, email },
    password: { required },
};

const v$ = useVuelidate(rules, registerInput);
const { loading, register } = useRegisterUser();

async function submitRegister() {
    const result = await v$.value.$validate();
   
    if (!result) return;

    await register();

    v$.value.$reset()
}
</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your
                account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="submitRegister" novalidate>
                <div>
                    <Error
                        label="Name"
                        labelFor="name"
                        :errors="v$.name.$errors"
                    >
                        <div class="mt-2">
                           <BaseInput v-model="registerInput.name" 
                                inputName="name"
                                type="text"  
                                :inputClass="inputClass"/>
                        </div>
                    </Error>
                </div>

                <div>
                    <Error
                        label="E-mail"
                        labelFor="email"
                        :errors="v$.email.$errors"
                    >
                        <div class="mt-2">
                           <BaseInput v-model="registerInput.email" 
                                inputName="email"
                                type="email"  
                                :inputClass="inputClass"/>
                        </div>
                    </Error>
                </div>

                <div>
                    <Error
                        label="Password"
                        labelFor="password"
                        :errors="v$.password.$errors"
                    >
                        <div class="mt-2">
                            <BaseInput v-model="registerInput.password"
                                inputName="password"
                                type="password"
                                :inputClass="inputClass" />
                        </div>
                    </Error>
                    <div class="items-center justify-between mt-3 text-right">
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 text-center">Forgot password?</a>
                        </div>
                    </div>
                </div>

                <div>
                    <BaseButton :buttonClass="buttonClass" label="Register" :loading="loading"/>
                </div>
            </form>
        </div>
    </div>
</template>