<script setup>
  import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from "@heroicons/vue/24/solid";
  import { Form, Field } from "vee-validate";
  import * as yup from "yup";
  import { useAuthStore } from "@/stores/authStore";
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  import Axios from "@/plugin/axios";
  import api from "@/plugin/apis";
  import toast from "@/plugin/toast";

  const authStore = useAuthStore();
  const router = useRouter();

  const isSignup = ref(false);
  const firstName = ref(null);
  const lastName = ref(null);
  const email = ref(null);
  const password = ref(null);
  const confirmPassword = ref(null);
  const isPassword = ref(false);
  const isConfirmPassword = ref(false);

  const schema = yup.object({
    FirstName: yup.string().required('First name is a required field').max(50, 'First name must be at most 50 characters'),
    LastName: yup.string().required('Last name is a required field').max(50, 'First name must be at most 50 characters'),
    Email: yup.string().required().email(),
    Password: yup
      .string()
      .required()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    ConfirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("Password"), ""], "Passwords must match"),
  });

  const signUp = async () => {
    isSignup.value = true;

    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };

    await Axios.post(api.signUp, user)
      .then(({ data }) => {
        authStore.sessionStore({
          password: password.value,
          email: email.value,
        });

        toast.success(data?.message ?? `User Sign Up Success!`);
        router.push("/login");
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message ?? "User Can't Sign Up!");
      })
      .finally(() => {
        isSignup.value = false;
      });
  };
</script>

<template>
  <div class="w-screen h-screen flex items-center">
    <Form @submit="signUp" :validation-schema="schema" v-slot="{ errors }" class="auth">
      <h1 class="auth-title">Sign Up</h1>
      <p class="auth-detail">
        Already have an account?
        <RouterLink to="/login" class="route-link">Login</RouterLink>
      </p>

      <label for="firstName" class="label">First Name</label>
      <Field v-model="firstName" type="text" name="FirstName" id="firstName" class="input"
        placeholder="Enter Your First Name" />
      <p class="error-message">{{ errors?.FirstName }}</p>

      <label for="lastName" class="label">Last Name</label>
      <Field v-model="lastName" type="text" name="LastName" id="lastName" class="input"
        placeholder="Enter Your Last Name" />
      <p class="error-message">{{ errors?.LastName }}</p>

      <label for="email" class="label">Email Address</label>
      <Field v-model="email" type="email" name="Email" id="email" class="input"
        placeholder="Enter Your Email Address" />
      <p class="error-message">{{ errors?.Email }}</p>

      <label for="password" class="label">Password</label>
      <div class="input bg-white flex justify-between">
        <Field v-model="password" :type="isPassword ? 'text' : 'password'" name="Password" id="password"
          class="text-gray-900 placeholder:text-gray-400 focus:outline-none w-full" placeholder="Enter Your Password" />
        <div class="pl-2" @click="isPassword = !isPassword">
          <EyeSlashIcon v-if="isPassword" class="password-icon" />
          <EyeIcon v-else class="password-icon" />
        </div>
      </div>
      <p class="error-message">{{ errors?.Password }}</p>

      <label for="confirmPassword" class="label">Confirm Password</label>
      <div class="input bg-white flex justify-between">
        <Field v-model="confirmPassword" :type="isConfirmPassword ? 'text' : 'password'" name="ConfirmPassword"
          id="confirmPassword" class="text-gray-900 placeholder:text-gray-400 focus:outline-none w-full"
          placeholder="Enter Your Confirm Password" />
        <div class="pl-2" @click="isConfirmPassword = !isConfirmPassword">
          <EyeSlashIcon v-if="isConfirmPassword" class="password-icon" />
          <EyeIcon v-else class="password-icon" />
        </div>
      </div>
      <p class="error-message">{{ errors?.ConfirmPassword }}</p>

      <button type="submit" class="button flex items-center justify-center w-full mt-8" :disabled="isSignup">
        Sign Up
        <ArrowPathIcon v-if="isSignup" class="loading-btn" />
      </button>
    </Form>
  </div>
</template>
