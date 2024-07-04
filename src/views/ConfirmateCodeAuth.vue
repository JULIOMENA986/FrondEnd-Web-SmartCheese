<template>
    <div class="verification-container">
      <h1>SMARTCHEESE</h1>
      <div class="verification-box">
        <input v-model="code" type="text" placeholder="Code" />
        <button @click="confirmCode">Confirm</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmateCodeAuth',
    data() {
      return {
        code: ''
      };
    },
    methods: {
      confirmCode() {
        // Aquí iría la lógica para confirmar el código de verificación
        console.log('Código confirmado:', this.code);
        // Por ejemplo, podrías hacer una llamada a una API para validar el código
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
    background-color: #1a1a1a;
    color: white;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    margin-bottom: 2rem;
  }
  
  .verification-box {
    background-color: #333;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .verification-box input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #444;
    color: white;
  }
  
  .verification-box button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background: linear-gradient(90deg, #2b8a3e, #1a6e2b);
    color: white;
    cursor: pointer;
  }
  
  .verification-box button:hover {
    background: linear-gradient(90deg, #1a6e2b, #2b8a3e);
  }
  </style>
  