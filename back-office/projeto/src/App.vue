<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <Dashboard />
      <DataTable />
    </div>
  </div>
</template>

<script setup>
import Dashboard from './components/Dashboard.vue';
import DataTable from './components/DataTable.vue';
</script>

