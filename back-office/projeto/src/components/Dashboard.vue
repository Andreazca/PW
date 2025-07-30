<template>
  <div class="dashboard-container">
    <div class="charts-container">
      <div class="chart-card">
        <h4>Profissionais em Ação</h4>
        <canvas ref="chartAcoesRef"></canvas>
      </div>
      <div class="chart-card">
        <h4>Profissionais em Auditoria</h4>
        <canvas ref="chartAuditoriaRef"></canvas>
      </div>
    </div>
    <DataTable />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

const chartAcoesRef = ref(null);
const chartAuditoriaRef = ref(null);

onMounted(() => {
  new Chart(chartAcoesRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Disponíveis', 'Em Auditoria', 'Ocupados', 'Indisponíveis'],
      datasets: [{
        data: [30, 20, 40, 10],
        backgroundColor: ['#3BAA45', '#5E6BE2', '#D957F6', '#FDA329']
      }]
    },
    options: {
      plugins: { legend: { position: 'right' } },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const chart = elements[0].element.$context.chart;
          const index = elements[0].index;
          const label = chart.data.labels[index];
          alert(`Clicaste em: ${label}`);
        }
      }
    }
  });

  new Chart(chartAuditoriaRef.value, {
    type: 'bar',
    data: {
      labels: ['Inspeções', 'Segurança', 'Monitorização'],
      datasets: [{
        label: 'Quantidade',
        data: [22, 25, 29],
        backgroundColor: '#EC2E91'
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      responsive: true,
      scales: { x: { beginAtZero: true } }
    }
  });
});
</script>
