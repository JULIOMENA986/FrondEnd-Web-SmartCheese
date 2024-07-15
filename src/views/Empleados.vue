<template>
    <div class="dashboard">
      <Sidebar v-if="!isMobile" />
      <div class="main-content">
        <EmployeeList />
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '../components/Sidebar.vue';
  import EmployeeList from '../components/EmployeeList.vue';
  
  export default {
    name: 'EmpleadosDash',
    components: {
      Sidebar,
      EmployeeList
    },
    data() {
      return {
        isMobile: false
      };
    },
    mounted() {
      this.checkWindowSize();
      window.addEventListener('resize', this.checkWindowSize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkWindowSize);
    },
    methods: {
      checkWindowSize() {
        this.isMobile = window.innerWidth <= 768;
      }
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f0f0f0;
    overflow-x: auto;
  }
  
  @media (min-width: 769px) {
    .dashboard {
      flex-direction: row;
    }
  }
  </style>
  