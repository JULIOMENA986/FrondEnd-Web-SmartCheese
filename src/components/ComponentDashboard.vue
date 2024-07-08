<template>
    <div :class="['dashboard-item', colorClass]">
      <h3>{{ title }}</h3>
      <p>{{ time }}</p>
      <span>{{ description }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComponentDashboard',
    props: {
      title: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },
    computed: {
      colorClass() {
        return {
          'blue': this.color === 'blue',
          'orange': this.color === 'orange',
          'red': this.color === 'red',
          'green': this.color === 'green'
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-item {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .dashboard-item h3 {
    font-size: 16px;
    font-weight: 600;
    color: #444;
    margin-bottom: 10px;
  }
  
  .dashboard-item p {
    font-size: 14px;
    color: #888;
  }
  
  .dashboard-item span {
    font-size: 12px;
    color: #bbb;
  }
  
  .blue {
    border-left: 5px solid #3498db;
  }
  
  .orange {
    border-left: 5px solid #e67e22;
  }
  
  .red {
    border-left: 5px solid #e74c3c;
  }
  
  .green {
    border-left: 5px solid #2ecc71;
  }
  </style>
  