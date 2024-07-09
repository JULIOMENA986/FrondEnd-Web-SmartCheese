<template>
    <div class="dashboard-container">
      <Sidebar />
      <div class="main-content">
        <div class="header">
          <h1>Dashboard</h1>
        </div>
        <div class="content">
          <div class="left-content">
            <h2>Today</h2>
            <ComponentDashboard title="Productos" time="5:12 pm" description="Bejanlo di pasar" color="blue" />
            <ComponentDashboard title="Housing" time="5:12 pm" description="Boyar Lietrik" color="orange" />
            <h2>Monday, 23 March 2020</h2>
            <ComponentDashboard title="Food and Drink" time="5:12 pm" description="Makan Steak" color="red" />
            <ComponentDashboard title="Entertainment" time="5:12 pm" description="Nonton Blokop" color="green" />
          </div>
          <div class="right-content">
            <Card title="Net Profit" value="Algo" description="45% increase from target" color="orange" />
            <Card title="Orders in Dollars" value="Algo" description="02% increase from target" color="blue" />
            <Card title="Sales Amount (Units)" value="Algo" description="12% increase from target" color="green" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue';
  import ComponentDashboard from '../components/ComponentDashboard.vue';
  import Card from '../components/Card.vue';
  
  export default {
    name: 'AppDashboard',
    components: {
      Sidebar,
      ComponentDashboard,
      Card
    }
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    height: 100vh;
    background-color: #f4f4f9;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #444;
  }
  
  .content {
    display: flex;
    margin-top: 20px;
  }
  
  .left-content, .right-content {
    flex: 1;
  }
  
  .left-content {
    margin-right: 20px;
  }
  
  .left-content h2 {
    font-size: 18px;
    font-weight: 600;
    color: #888;
    margin-bottom: 10px;
  }
  
  .right-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>
  