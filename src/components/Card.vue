<template>
    <div :class="['card', color]">
      <h3>{{ title }}</h3>
      <p>{{ amount }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppCard',
    props: {
      title: String,
      amount: String,
      color: String
    }
  }
  </script>

  
  
  <style>
  .card {
    padding: 20px;
    border-radius: 8px;
    color: white;
    width: 200px;
    text-align: center;
  }
  
  .orange {
    background-color: orange;
  }
  
  .blue {
    background-color: blue;
  }
  
  .purple {
    background-color: purple;
  }
  </style>
  