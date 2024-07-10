<template>
  <div class="container-fluid login-container">
    <div class="row h-100">
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center left-column">
        <h1>SmartCheese</h1>
        <div class="social-icons mt-4">
          <i class="fa fa-facebook"></i>
          <i class="fa fa-twitter"></i>
          <i class="fa fa-instagram"></i>
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center right-column">
        <form @submit.prevent="handleLogin" class="w-75">
          <h2>LOGIN</h2>
          <p>Please fill your information below</p>
          <div class="alert alert-danger" v-if="error_msg">{{ error_msg }}</div>
          <div class="form-group mb-3">
            <input type="email" v-model="email" class="form-control" placeholder="E-mail" required />
          </div>
          <div class="form-group mb-3">
            <input type="password" v-model="password" class="form-control" placeholder="Password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100 ">Login</button>
          <p class="mt-3">Don't have an account? <a href="/register">Register</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';
import Cookies from 'js-cookie';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      api_url: 'http://127.0.0.1:3300/api/',
      error_msg: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(this.api_url + 'login', {
          email: this.email,
          password: this.password
        });
        console.log(response.data);
        
        if (response.data?.status === 'error') {
          throw new Error(response.data?.message);
        }


        const enable2fa = response.data?.enable2fa;
        const token = response.data?.token;
        var route = '';
        // localStorage.setItem('token', token);
        Cookies.set('token', token);

        if (enable2fa) {
          store.dispatch('loginAlone', token);
          route = '/confirmatecode';
        } else {
          const user = response.data?.user;
          store.dispatch('authenticate', { token, user });
          route = '/dashboard';
        }
        
        this.$router.push(route);

      } catch (error) {
        console.log(error.message);
        this.error_msg = error.message;
        // Handle login error
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

.login-container {
  height: 100vh;
}

.left-column {
  background: linear-gradient(to bottom, #2F3033 0%, #227050 100%);
  color: white;
  text-align: center;
}

.right-column {
  background-color: white;
  padding: 20px;
}

.social-icons .fa {
  margin: 0 10px;
  font-size: 24px;
}

h2 {
  margin-bottom: 10px;
}

button.btn-primary {
  background-color: #2F3033;
  border-color: #2F3033;
  color: white;
}

button.btn-primary:hover {
  background-color: #227050;
  border-color: #227050;
}

@media (max-width: 768px) {
  .login-container .row {
    flex-direction: column;
  }

  .left-column, .right-column {
    width: 100%;
    height: auto;
  }
}
</style>
