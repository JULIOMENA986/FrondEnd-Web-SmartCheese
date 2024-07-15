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
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sucursal in filteredSucursales" :key="sucursal.id">
            <td>{{ sucursal.id }}</td>
            <td>{{ sucursal.name }}</td>
            <td>{{ sucursal.address }}</td>
            <td>
              <button aria-label="true" class="action-button edit" @click="showEditModal(sucursal)"><i class="fa fa-pencil"></i></button>
              <button aria-label="true" class="action-button delete" @click="deleteSucursal(sucursal.id)"><i class="fa fa-times"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Agregar/Editar -->
    <div class="modal" v-if="isModalVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>{{ isEditing ? 'Editar Sucursal' : 'Agregar Sucursal' }}</h3>
        <form @submit.prevent="isEditing ? updateSucursal() : addSucursal()">
          <label>Nombre:</label>
          <input type="text" v-model="form.name" required />
          <label>Dirección:</label>
          <input type="text" v-model="form.address" required />
          <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'BranchList',
  data() {
    return {
      sucursales: [],
      searchQuery: '',
      isModalVisible: false,
      isEditing: false,
      apiUrl: 'http://127.0.0.1:3333/api/',
      form: {
        id: '',
        nombre: '',
        direccion: ''
      },
      token: '',
    };
  },
  computed: {
    filteredSucursales() {
      return this.sucursales.filter(sucursal => sucursal.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    authHeaders() {
      return {
        'Authorization': `Bearer ${this.token}`
      };
    }
  },
  methods: {
    fetchSucursales() {
      axios.get(this.apiUrl + 'subsidiaries/get', { headers: this.authHeaders })
        .then(response => {
          this.sucursales = response.data?.subsidiaries;
        })
        .catch(error => {
          console.error('Error fetching sucursales:', error);
        });
    },
    showAddModal() {
      this.isEditing = false;
      this.form = { id: '', name: '', address: '' };
      this.isModalVisible = true;
    },
    showEditModal(sucursal) {
      this.isEditing = true;
      this.form = { ...sucursal };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    addSucursal() {
      axios.post(this.apiUrl + 'subsidiaries/create', this.form, { headers: this.authHeaders })
        .then(() =>{
          this.fetchSucursales();
          this.closeModal();
        })
        .catch(error => {
          console.error('Error adding sucursal:', error);
        });
    },
    updateSucursal() {
      axios.put(this.apiUrl + 'subsidiaries/update/' + this.form.id, this.form, { headers: this.authHeaders })
        .then(() => {
          this.fetchSucursales();
          this.closeModal();
        })
        .catch(error => {
          console.error('Error updating sucursal:', error);
        });
    },
    deleteSucursal(id) {
      axios.delete(this.apiUrl + 'subsidiaries/delete/' + id, { headers: this.authHeaders })
        .then(() => {
          this.fetchSucursales();
        })
        .catch(error => {
          console.error('Error deleting sucursal:', error);
        });
    }
  },
  mounted() {
    this.fetchSucursales();
  },
  created(){
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

.status-open {
  color: green;
}

.status-closed {
  color: red;
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

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 8px;
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
