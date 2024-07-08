<template>
    <div>
      <Sidebar />
      <ComponentDashboard />
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue'; // Ruta correcta desde 'views'
  import ComponentDashboard from '../components/ComponentDashboard.vue'; // Ruta correcta desde 'views'
  
  export default {
    name: 'AppDashboard',
    components: {
      Sidebar,
      ComponentDashboard
    }
  }
  </script>
  
  
  <style>
  #app {
    display: flex;
    height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #f4f4f9;
  }
  </style>
  