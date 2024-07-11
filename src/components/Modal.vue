<template>
    <div class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <button class="close-btn" @click="close">&times;</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  