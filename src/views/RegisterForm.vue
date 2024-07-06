<template>
  <div class="container-fluid register-container">
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
        <form @submit.prevent="handleSubmit" class="w-75">
          <h2>REGISTER</h2>
          <p>Please fill your information below</p>
          <div class="form-group mb-3">
            <input type="email" v-model="email" class="form-control" placeholder="E-mail" required />
          </div>
          <div class="form-group mb-3">
            <input type="text" v-model="name" class="form-control" placeholder="Name" required />
          </div>
          <div class="form-group mb-3">
            <input type="password" v-model="password" class="form-control" placeholder="Password" required />
          </div>
          <div class="form-group mb-3">
            <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
          <p class="mt-3">Already have an account? <a href="/login">Login to your account</a></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',  // Updated to a multi-word name
  data() {
    return {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      try {
        const response = await axios.post('http://127.0.0.1:3333/api/register', {
          email: this.email,
          name: this.name,
          password: this.password
        });
        console.log(response.data);
        // Handle successful registration
      } catch (error) {
        console.error(error);
        // Handle registration error
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

.register-container {
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
  .register-container .row {
    flex-direction: column;
  }

  .left-column, .right-column {
    width: 100%;
    height: auto;
  }
}
</style>
