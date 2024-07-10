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
            <th>Estado</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sucursal in filteredSucursales" :key="sucursal.id">
            <td>{{ sucursal.id }}</td>
            <td :class="{'status-open': sucursal.estado === 'Abierto', 'status-closed': sucursal.estado === 'Cerrado'}">{{ sucursal.estado }}</td>
            <td>{{ sucursal.nombre }}</td>
            <td>{{ sucursal.direccion }}</td>
            <td>
              <button class="action-button edit" @click="showEditModal(sucursal)"><i class="fas fa-pencil-alt"></i></button>
              <button class="action-button delete" @click="deleteSucursal(sucursal.id)"><i class="fas fa-times"></i></button>
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
          <label>Sucursal:</label>
          <input type="text" v-model="form.id" :disabled="isEditing" required />
          <label>Estado:</label>
          <select v-model="form.estado" required>
            <option>Abierto</option>
            <option>Cerrado</option>
          </select>
          <label>Nombre:</label>
          <input type="text" v-model="form.nombre" required />
          <label>Dirección:</label>
          <input type="text" v-model="form.direccion" required />
          <button type="submit">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BranchList',
  data() {
    return {
      sucursales: [],
      searchQuery: '',
      isModalVisible: false,
      isEditing: false,
      form: {
        id: '',
        estado: '',
        nombre: '',
        direccion: ''
      }
    };
  },
  computed: {
    filteredSucursales() {
      return this.sucursales.filter(sucursal => sucursal.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    fetchSucursales() {
      axios.get('/api/sucursales')
        .then(response => {
          this.sucursales = response.data;
        })
        .catch(error => {
          console.error('Error fetching sucursales:', error);
        });
    },
    showAddModal() {
      this.isEditing = false;
      this.form = { id: '', estado: '', nombre: '', direccion: '' };
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
      axios.post('/api/sucursales', this.form)
        .then(response => {
          this.sucursales.push(response.data);
          this.closeModal();
        })
        .catch(error => {
          console.error('Error adding sucursal:', error);
        });
    },
    updateSucursal() {
      axios.put(`/api/sucursales/${this.form.id}`, this.form)
        .then(response => {
          const index = this.sucursales.findIndex(sucursal => sucursal.id === this.form.id);
          this.$set(this.sucursales, index, response.data);
          this.closeModal();
        })
        .catch(error => {
          console.error('Error updating sucursal:', error);
        });
    },
    deleteSucursal(id) {
      axios.delete(`/api/sucursales/${id}`)
        .then(() => {
          this.sucursales = this.sucursales.filter(sucursal => sucursal.id !== id);
        })
        .catch(error => {
          console.error('Error deleting sucursal:', error);
        });
    }
  },
  mounted() {
    this.fetchSucursales();
  }
};
</script>

<style scoped>
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
