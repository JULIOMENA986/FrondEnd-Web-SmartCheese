<template>
  <div class="dashboard">
    <Sidebar v-if="!isMobile" />
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
  beforeUnmount() { // Cambiado de beforeDestroy a beforeUnmount
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
.dashboard {
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f0f0f0;
}

@media (min-width: 769px) {
  .dashboard {
    flex-direction: row;
  }
}
</style>

