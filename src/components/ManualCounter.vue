<template>
  <div class="container">
    <h1>Contador Manual de Personas</h1>
    <div v-if="!accessToken">Autenticando...</div>
    <div v-else>
      <p>Conteo: {{ counter }}</p>
      <button @click="add" class="btn btn-primary">Sumar</button>
      <button @click="subtract" class="btn btn-danger">Restar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { login, sendCounterCommand } from '@/api';
import { createSocketConnection } from '@/socket';

export default {
  setup() {
    const accessToken = ref(null);
    const socket = ref(null);
    const counter = ref(0);

    function updateCounter(newCounterValue) {
      console.log('Updating counter:', newCounterValue);
      counter.value = newCounterValue;
    }

    async function authenticate() {
      const username = 'clicker3.demo';
      const password = 'TEST.2022#';

      try {
        const response = await login(username, password);
        accessToken.value = response.access_token;
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }

    onMounted(async () => {
      await authenticate();
      socket.value = createSocketConnection(accessToken.value, updateCounter);
    });

    async function add() {
      try {
        const response = await sendCounterCommand('manual-add', accessToken.value, 1, 'DEMO001', 'DEMO001A1L1', 'DEMO001A1L1Z1MC3', 'clicker3.demo', 'clicker3.demo.ikcount@iklab.cl');
        console.log('Respuesta de sumar:', response);
      } catch (error) {
        console.error('Error al sumar:', error);
      }
    }

    async function subtract() {
      try {
        const response = await sendCounterCommand('manual-sub', accessToken.value, 1, 'DEMO001', 'DEMO001A1L1', 'DEMO001A1L1Z1MC3', 'clicker3.demo', 'clicker3.demo.ikcount@iklab.cl');
        console.log('Respuesta de restar:', response);
      } catch (error) {
        console.error('Error al restar:', error);
      }
    }

    // Devuelve las propiedades y funciones que se utilizarán en la plantilla
    return {
      accessToken,
      counter,
      add,
      subtract,
    };
  },
};
</script>

