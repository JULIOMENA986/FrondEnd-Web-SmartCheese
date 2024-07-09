<template>
  <div class="branch-list">
    <div class="header">
      <input type="text" placeholder="Buscar" class="search-input" />
      <button class="add-button">Agregar</button>
    </div>
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
        <tr v-for="branch in branches" :key="branch.id">
          <td>{{ branch.id }}</td>
          <td :class="{'status-open': branch.status === 'Abierto', 'status-closed': branch.status === 'Cerrada'}">{{ branch.status }}</td>
          <td>{{ branch.name }}</td>
          <td>{{ branch.address }}</td>
          <td>
            <button class="action-button edit">✏️</button>
            <button class="action-button delete">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BranchList',
  data() {
    return {
      branches: [
        { id: 'Suc-01', status: 'Abierto', name: 'Torreon', address: 'Molino 124' },
        { id: 'Suc-02', status: 'Cerrada', name: 'Gomez', address: 'Fuentes 32' },
        { id: 'Suc-03', status: 'Abierto', name: 'Lerdo', address: 'Villa Juarez' },
      ]
    };
  }
}
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
</style>
