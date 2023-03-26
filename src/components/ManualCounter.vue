<template>
  <div class="container">
    <h1 class="my-4 text-center display-1">Contador Manual de Personas</h1>
    <div v-if="!accessToken" class="card d-flex justify-content-center align-items-center mx-auto" style="width: 18rem;">
      <div class="card-body">
        <form @submit.prevent="authenticate">
          <div class="mb-3">
            <label for="username" class="form-label">Nombre de usuario</label>
            <input type="text" class="form-control" id="username" v-model="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        </form>
      </div>
    </div>
    <div v-else class="card d-flex justify-content-center align-items-center mx-auto" style="width: 18rem;">
      <div class="card-body">
        <div class="counter-container mb-3">
          <p>Conteo: <span class="counter-value">{{ counter }}</span></p>
        </div><br>
        <button @click="add" class="btn btn-primary m-1">Sumar</button>
        <button @click="subtract" class="btn btn-danger m-1">Restar</button><br>
        <button @click="logout" class="btn btn-secondary m-3">Cerrar sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login, sendCounterCommand } from '@/api';
import { createSocketConnection } from '@/socket';

export default {
  setup() {
    const accessToken = ref(null);
    const socket = ref(null);
    const counter = ref(0);
    const username = ref('');
    const password = ref('');

    function updateCounter(newCounterValue) {
      console.log('Updating counter:', newCounterValue);
      counter.value = newCounterValue;
    }

    async function authenticate() {
      try {
        const response = await login(username.value, password.value);
        accessToken.value = response.access_token;
        socket.value = createSocketConnection(accessToken.value, updateCounter);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    }

    function logout() {
      accessToken.value = null;
      socket.value.disconnect();
    }

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
      username,
      password,
      authenticate,
      logout,
      add,
      subtract,
    };
  },
};
</script>

<style scoped>
.counter-container {
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.counter-value {
  font-size: 24px;
  font-weight: bold;
  margin-left: 5px;
}
</style>