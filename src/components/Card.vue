<template>
    <div :class="['card', cardClass]">
      <h3>{{ title }}</h3>
      <p>{{ value }}</p>
      <span>{{ description }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppCard',
    props: {
      title: String,
      value: String,
      description: String,
      color: String
    },
    computed: {
      cardClass() {
        return {
          'net-profit': this.color === 'orange',
          'orders-dollars': this.color === 'blue',
          'sales-amount': this.color === 'green'
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .card h3 {
    font-size: 16px;
    font-weight: 600;
    color: #444;
    margin-bottom: 10px;
  }
  
  .card p {
    font-size: 24px;
    font-weight: 700;
    color: #444;
  }
  
  .card span {
    font-size: 12px;
    color: #888;
  }
  
  .net-profit {
    border-left: 5px solid #e67e22;
  }
  
  .orders-dollars {
    border-left: 5px solid #3498db;
  }
  
  .sales-amount {
    border-left: 5px solid #2ecc71;
  }
  </style>
  