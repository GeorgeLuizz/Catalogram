<template>
  <q-page class="row items-center justify-evenly">

  </q-page>
</template>

<script setup lang="ts">
import { api } from 'boot/axios';
import { onMounted } from 'vue';

onMounted(async () => {
  const res = await api.get('api/products')
  console.log(res.data)
})
</script>
