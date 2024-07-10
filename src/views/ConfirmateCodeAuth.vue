<template>
  <div class="verification-container">
    <h1 class="title">SMARTCHEESE</h1>
    <div class="verification-box">
      <input v-model="code" type="text" placeholder="Code" class="code-input" />
      <button @click="confirmCode" class="confirm-button">Confirm</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';
import Cookies from 'js-cookie';

export default {
  name: 'ConfirmateCodeAuth',
  data() {
    return {
      code: '',
      api_url: 'http://127.0.0.1:3300/api/',
    };
  },
  methods: {
    async confirmCode() {
      try {
        // var token = localStorage.getItem('token');
        const token = Cookies.get('token')

        const response = await axios.post(this.api_url, 'verify', {
          code: this.code,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const newToken = response.data?.data?.token;
        // localStorage.setItem('token', newToken);
        Cookies.set('token', newToken);

        const user = response.data?.data?.user;

        store.dispatch('authenticate', { token, user });

        this.$router.push('/dashborard');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.verification-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #2F3033 0%, #227050 81%);
  color: white;
  font-family: Arial, sans-serif;
  padding-top: 5rem;
}

.title {
  margin-bottom: 4rem;
  font-size: 2rem;
  color: #ffffff;
}

.verification-box {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 3rem;
  border-radius: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.code-input {
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid #888;
  border-radius: 5px;
  background-color: transparent;
  color: white;
  text-align: center;
  font-size: 1rem;
}

.confirm-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 20px;
  background: linear-gradient(90deg, #000000, #005000, #007000);
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
}

.confirm-button:hover {
  background: linear-gradient(90deg, #005000, #007000, #000000);
}
</style>
