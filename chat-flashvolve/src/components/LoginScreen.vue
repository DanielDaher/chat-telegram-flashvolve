<script>
import { ref } from 'vue';
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
      console.log('apiData: ', apiData)
      if (apiData.token) return router.push('/dashboard');
      console.log('data error: ', apiData.response.data.error)
      errorMessage.value = apiData.response.data.error || 'Usuário ou senha inválidos';
      setTimeout(() => errorMessage.value = '', 2000); // trocar isso por um sweetalert
    };

    return { username, password, errorMessage, newAccount, submitForm };
  },

  mounted() {
    console.log('mounted');
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
