<template>
    <div class="dashboard">
      <Sidebar />
      <div class="main-content">
        <BranchList />
      </div>
    </div>
  </template>
  
  <script>
 import Sidebar from '../components/Sidebar.vue';
  import BranchList from '../components/BranchList.vue';
  
  export default {
    name: 'SucursalesDash',
    components: {
      Sidebar,
      BranchList
    }
  }
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f0f0f0;
  }
  </style>
  