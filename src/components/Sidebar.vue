<template>
    <div class="sidebar">
      <div class="profile">
        <img src="path/to/profile-pic.jpg" alt="Admin">
        <p>Admin</p>
        <p>admin@example.com</p>
      </div>
      <ul class="menu">
        <li>Dashboard</li>
        <li>Sucursales</li>
        <li>Empleados</li>
        <li>Accounts</li>
        <li>Settings</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppSidebar'
  }
  </script>
  
  <style>
  .sidebar {
    width: 250px;
    background-color: #f8f9fa;
    padding: 20px;
  }
  
  .profile {
    text-align: center;
  }
  
  .menu {
    list-style-type: none;
    padding: 0;
  }
  
  .menu li {
    padding: 10px 0;
    cursor: pointer;
  }
  </style>
  