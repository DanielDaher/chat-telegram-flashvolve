<script>
import { ref } from 'vue';
import { fetchData } from '../services/api';

export default {
  setup() {
    const username = ref('');
    const password = ref('');

    const makeLogin = () => {
      console.log(username.value);
      console.log(password.value);
      fetchData('login');
    };

    return { username, password, makeLogin };
  },

  mounted() {
    console.log('mounted');
  }
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="makeLogin">
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
    </form>
  </div>
</template>
