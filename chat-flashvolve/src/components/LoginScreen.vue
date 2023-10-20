<script>
import { ref } from 'vue';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import { loginOrCreateUser } from '../services/api';

export default {
  setup() {
    const newAccount = ref(false);
    const errorMessage = ref('');
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const submitForm = async () => {
      const endpoint = newAccount.value ? 'users' : 'login';
      const params = { userName: username.value, password: password.value, endpoint }
      const apiData = await loginOrCreateUser(params);

      if (apiData.token) {
        localStorage.setItem('tokenChatTelegramFlashVolve', apiData.token);
        return router.push('/dashboard');
      } 

      errorMessage.value = apiData.response.data.error || 'Usuário ou senha inválidos';
      Swal.fire({
        title: errorMessage.value,
        timer: 2000,
        showConfirmButton: true,
        timerProgressBar: true,
      });
      errorMessage.value = '';
    };

    return { username, password, errorMessage, newAccount, router, submitForm };
  },

  mounted() {
    const token = localStorage.getItem('tokenChatTelegramFlashVolve');
    if (token) return this.router.push('/dashboard');
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div>
        <input type="checkbox" id="check" v-model="newAccount" />
        <label for="check">Não tenho uma conta ainda</label>
      </div>
      <p> Preencha suas informações para {{ newAccount ? 'se cadastrar' : 'logar' }} </p>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <p v-if="errorMessage.length">{{ errorMessage }}</p> <!-- trocar por sweetalert -->
    </form>
  </div>
</template>
