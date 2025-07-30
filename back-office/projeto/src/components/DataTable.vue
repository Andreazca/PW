<template>
  <div class="bottom-card">
    <h3>Lista de Profissionais</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Disponibilidade</th>
          <th>Atividade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prof in paginatedData" :key="prof.id">
          <td>{{ prof.id }}</td>
          <td>{{ prof.nome }}</td>
          <td>{{ prof.email }}</td>
          <td>{{ prof.disponibilidade }}</td>
          <td>{{ prof.atividade }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="currentPage = page"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const profissionais = [
  { id: 1, nome: "João Martins", email: "martins@gmail.com", disponibilidade: "Em Auditoria", atividade: "Inspeções" },
  { id: 2, nome: "Carolina Teixeira", email: "carol@gmail.com", disponibilidade: "Disponível", atividade: "A aguardar auditoria" },
  { id: 3, nome: "Lara Brandão", email: "brandao@gmail.com", disponibilidade: "Indisponível", atividade: "Licença Médica" },
  { id: 4, nome: "Bernardo Ataíde", email: "bernardo@gmail.com", disponibilidade: "Em Auditoria", atividade: "Monitorização" },
  { id: 5, nome: "André Cardoso", email: "andre@gmail.com", disponibilidade: "Disponível", atividade: "Supervisão" },
  { id: 6, nome: "Rodrigo Vilhena", email: "rodrigo@gmail.com", disponibilidade: "Disponível", atividade: "Formação" }
];

const currentPage = ref(1);
const rowsPerPage = 4;

const totalPages = computed(() => Math.ceil(profissionais.length / rowsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return profissionais.slice(start, end);
});
</script>
