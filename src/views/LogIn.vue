<script setup>
  import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'
  import { Form, Field } from 'vee-validate'
  import * as yup from 'yup'
  import { useAuthStore } from '@/stores/authStore'
  import { useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import Axios from '@/plugin/axios'
  import api from '@/plugin/apis'
  import toast from '@/plugin/toast'

  const authStore = useAuthStore()
  const router = useRouter()

  const isLogin = ref(false)
  const email = ref(null)
  const password = ref(null)
  const isRemember = ref(false)
  const isPassword = ref(false)

  const schema = yup.object({
    Email: yup.string().required().email(),
    Password: yup
      .string()
      .required()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  })

  const login = async () => {
    isLogin.value = true

    const user = {
      email: email.value,
      password: password.value,
    }

    await Axios.post(api.login, user)
      .then(({ data }) => {
        if (isRemember.value)
          authStore.sessionStore({
            password: user.password,
            email: user.email,
          })
        else authStore.sessionRemove()

        authStore.loginUser(data.data)
        toast.success(data?.message ?? 'User Login Success!')
        router.push('/')
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message ?? "User Can't Login!")
      })
      .finally(() => {
        isLogin.value = false
      })
  }

  onMounted(() => {
    const authUser = sessionStorage.getItem('authUser')

    if (authUser) {
      const user = JSON.parse(authUser)
      email.value = user.email
      password.value = user.password
      isRemember.value = true
    }
  })
</script>

<template>
  <div class="w-screen h-screen flex items-center">
    <Form @submit="login" :validation-schema="schema" v-slot="{ errors }"
      class="bg-yellow-100 shadow-xl w-full sm:w-2/6 mx-5 sm:m-auto p-4 sm:p-6 md:p-10">
      <h1 class="auth-title">Login</h1>
      <p class="auth-detail">
        Doesn't have an account yet?
        <RouterLink to="/signup" class="route-link">Sign Up</RouterLink>
      </p>

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

      <label for="remember" class="flex items-center label my-5">
        <input v-model="isRemember" type="checkbox" id="remember" class="w-4 h-4 cursor-pointer mr-2" />
        Remember Me
      </label>

      <button type="submit" class="button flex items-center justify-center w-full mt-10" :disabled="isLogin">
        Login
        <ArrowPathIcon v-if="isLogin" class="loading-btn" />
      </button>
    </Form>
  </div>
</template>
