<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-lg">
      <div>
        <h1 class="text-h4 q-ma-none">Produtos</h1>
        <p v-if="userId" class="text-caption text-grey q-mb-none">
          Mostrando produtos do usuário {{ userId }}
        </p>
      </div>
      <q-space />
      <q-btn
        color="primary"
        label="Atualizar"
        icon="refresh"
        @click="refreshProducts"
        :loading="productsStore.loading"
      />
    </div>

    <div v-if="productsStore.error" class="q-mb-md">
      <q-banner class="bg-red-2 text-negative">
        {{ productsStore.error }}
      </q-banner>
    </div>

    <div v-if="productsStore.loading" class="flex justify-center q-py-lg">
      <q-spinner color="primary" size="50px" />
    </div>

    <div v-else-if="productsStore.products.length === 0" class="text-center q-py-lg">
      <p class="text-subtitle1 text-grey">Nenhum produto encontrado</p>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="product in productsStore.products"
        :key="product.id"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from 'stores/products-store';
import ProductCard from 'components/ProductCard.vue';

const route = useRoute();
const productsStore = useProductsStore();

// Pega userId dos parâmetros da rota
const userId = computed(() => route.params.userId as string);

const loadProducts = async () => {
  const id = userId.value;

  if (!id) {
    productsStore.error = 'userId não informado na rota';
    return;
  }

  await productsStore.fetchProducts(id);
};

const refreshProducts = () => {
  void loadProducts();
};

watch(
  () => userId.value,
  (newUserId) => {
    if (newUserId) {
      void loadProducts();
    }
  },
  { immediate: true }
);
</script>
