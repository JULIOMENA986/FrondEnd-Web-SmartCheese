<template>
    <div class="sidebar">
      <div class="profile">
        <img src="" alt="Admin" class="profile-pic" />
        <p class="name">Admin</p>
        <p class="email">Admin@email.com</p>
      </div>
      <nav>
        <ul>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/SucursalesDash">Sucursales</router-link></li>
          <li><router-link to="/empleados">Empleados</router-link></li>
          <li><router-link to="/productos">Productos</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
        </ul>
      </nav>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import store from '@/store';
  
  export default {
    name: 'AppSidebar',
    data() {

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
    }
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    padding: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to right, #2F3033, #227050);
  }
  
  .profile {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .name {
    font-size: 18px;
    font-weight: 600;
  }
  
  .email {
    font-size: 14px;
    color: #bdc3c7;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }
  
  nav ul li {
    margin-bottom: 10px;
  }
  
  nav ul li a {
    color: #ecf0f1;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    display: block;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  nav ul li a:hover {
    background-color: #34495e;
  }
  
  .logout-btn {
    margin-top: auto;
    padding: 10px 20px;
    background-color: #3498db;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .logout-btn:hover {
    background-color: #2980b9;
  }
  </style>
  