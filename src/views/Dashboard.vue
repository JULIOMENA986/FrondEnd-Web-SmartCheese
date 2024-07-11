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
  },
  data() {
		return {
			user: {
				id: null
			}
		};
	},
	mounted() {
	},
	methods: {
		async logout() {
			try {
				const token = store.state.token;

				const response = await axios.post('http://127.0.0.1:3333/api/logout', {
					'Content-Type': 'application/json',
				},
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				});
				
				console.log(response.data)
				localStorage.removeItem('token');
				this.$router.push('/login');
			} 
        catch (error) {
				console.error(error);
				alert('Error. Verifique sus credenciales');
			}
		}
	},
};
</script>

<style scoped>
html, body, .dashboard-container {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #f4f4f9;
}

.main-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  margin-top: 20px;
  overflow-y: auto;
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

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .left-content {
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>
