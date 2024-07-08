<template>
    <div class="dashboard">
      <div class="today">
        <h2>Today</h2>
        <ul>
          <li>Proyectos</li>
          <li>Housing</li>
        </ul>
      </div>
      <div class="cards">
        <Card title="Net Profit" amount="Algo" color="orange" />
        <Card title="Orders in Dollars" amount="Algo" color="blue" />
        <Card title="Sales Amount" amount="Algo" color="purple" />
      </div>
    </div>
  </template>
  
  <script>
  import Card from './Card.vue'
  
  export default {
    name: 'ComponentDashboard',
    components: {
      Card
    }
  }
  </script>
  
  <style>
  .dashboard {
    display: flex;
    flex-direction: column;
  }
  
  .cards {
    display: flex;
    justify-content: space-around;
  }
  </style>
  