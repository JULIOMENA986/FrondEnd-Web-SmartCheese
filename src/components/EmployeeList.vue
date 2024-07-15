<template>
    <div class="branch-list">
      <div class="header">
        <input type="text" placeholder="Buscar" class="search-input" v-model="searchQuery" />
        <button class="add-button" @click="showAddModal">Agregar</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Sucursal</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Puesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="empleado in filteredEmpleados" :key="empleado.id">
              <td>{{ empleado.sucursal }}</td>
              <td>{{ empleado.nombre }}</td>
              <td>{{ empleado.apellidoPaterno }}</td>
              <td>{{ empleado.apellidoMaterno }}</td>
              <td>{{ empleado.email }}</td>
              <td>{{ empleado.telefono }}</td>
              <td>{{ empleado.direccion }}</td>
              <td>{{ empleado.puesto }}</td>
              <td>
                <button class="action-button edit" @click="showEditModal(empleado)">
                  <i class="fa fa-pencil"></i>
                </button>
                <button class="action-button delete" @click="deleteEmpleado(empleado.id)">
                  <i class="fa fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal v-if="isModalVisible" @close="closeModal">
        <h3>{{ isEditing ? 'Editar Empleado' : 'Agregar Empleado' }}</h3>
        <form @submit.prevent="isEditing ? updateEmpleado() : addEmpleado()">
          <label>Sucursal:</label>
          <select v-model="form.sucursal">
            <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.nombre">{{ sucursal.nombre }}</option>
          </select>
          <label>Nombre:</label>
          <input type="text" v-model="form.nombre" required />
          <label>Apellido Paterno:</label>
          <input type="text" v-model="form.apellidoPaterno" required />
          <label>Apellido Materno:</label>
          <input type="text" v-model="form.apellidoMaterno" required />
          <label>Email:</label>
          <input type="email" v-model="form.email" required />
          <label>Teléfono:</label>
          <input type="text" v-model="form.telefono" required />
          <label>Dirección:</label>
          <input type="text" v-model="form.direccion" required />
          <label>Puesto:</label>
          <input type="text" v-model="form.puesto" required />
          <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
        </form>
      </Modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import Modal from './Modal.vue';
  
  export default {
    name: 'EmployeeList',
    components: { Modal },
    data() {
      return {
        empleados: [],
        sucursales: [],
        searchQuery: '',
        isModalVisible: false,
        isEditing: false,
        apiUrl: 'http://127.0.0.1:3333/api/',
        form: {
          id: '',
          sucursal: '',
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          email: '',
          telefono: '',
          direccion: '',
          puesto: ''
        },
        token: '',
      };
    },
    computed: {
      filteredEmpleados() {
        return this.empleados.filter(empleado => empleado.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
      },
      authHeaders() {
        return {
          'Authorization': `Bearer ${this.token}`
        };
      }
    },
    methods: {
      fetchEmpleados() {
        axios.get(this.apiUrl + 'employees/get', { headers: this.authHeaders })
          .then(response => {
            this.empleados = response.data?.empleados;
          })
          .catch(error => {
            console.error('Error fetching empleados:', error);
          });
      },
      fetchSucursales() {
        axios.get(this.apiUrl + 'subsidiaries/get', { headers: this.authHeaders })
          .then(response => {
            this.sucursales = response.data?.sucursales;
          })
          .catch(error => {
            console.error('Error fetching sucursales:', error);
          });
      },
      showAddModal() {
        this.isEditing = false;
        this.form = { id: '', sucursal: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', email: '', telefono: '', direccion: '', puesto: '' };
        this.isModalVisible = true;
      },
      showEditModal(empleado) {
        this.isEditing = true;
        this.form = { ...empleado };
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      addEmpleado() {
        axios.post(this.apiUrl + 'employees/create', this.form, { headers: this.authHeaders })
          .then(() => {
            this.fetchEmpleados();
            this.closeModal();
          })
          .catch(error => {
            console.error('Error adding empleado:', error);
          });
      },
      updateEmpleado() {
        axios.put(this.apiUrl + 'employees/update/' + this.form.id, this.form, { headers: this.authHeaders })
          .then(() => {
            this.fetchEmpleados();
            this.closeModal();
          })
          .catch(error => {
            console.error('Error updating empleado:', error);
          });
      },
      deleteEmpleado(id) {
        axios.delete(this.apiUrl + 'employees/delete/' + id, { headers: this.authHeaders })
          .then(() => {
            this.fetchEmpleados();
          })
          .catch(error => {
            console.error('Error deleting empleado:', error);
          });
      }
    },
    mounted() {
      this.fetchEmpleados();
      this.fetchSucursales();
    },
    created() {
      this.token = Cookies.get('token');
    }
  };
  </script>
  
  <style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
  .branch-list {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .add-button {
    padding: 10px 20px;
    background-color: #3498db;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-button:hover {
    background-color: #2980b9;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  .action-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    margin: 0 5px;
  }
  
  .action-button.edit {
    color: #3498db;
  }
  
  .action-button.delete {
    color: #e74c3c;
  }
  </style>
  