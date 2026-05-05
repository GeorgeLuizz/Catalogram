<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-lg">
      <q-btn icon="arrow_back" flat round color="primary" @click="goBack" />
      <q-space />
    </div>

    <div v-if="loading" class="flex justify-center q-py-lg">
      <q-spinner color="primary" size="50px" />
    </div>

    <div v-else-if="!product" class="text-center q-py-lg">
      <p class="text-subtitle1 text-negative">Produto não encontrado</p>
    </div>

    <div v-else class="row q-col-gutter-lg">
      <!-- Imagem do Produto -->
      <div class="col-xs-12 col-md-6">
        <q-img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="product.name"
          style="border-radius: 8px"
          fit="cover"
        />
        <div v-else class="bg-grey-3 rounded-borders" style="height: 400px; display: flex; align-items: center; justify-content: center">
          <q-icon name="image" size="100px" color="grey-5" />
        </div>
      </div>

      <!-- Detalhes do Produto -->
      <div class="col-xs-12 col-md-6">
        <div class="text-h4 q-mb-md">{{ product.name }}</div>

        <div class="text-h5 text-primary q-mb-md">R$ {{ formatPrice(product.price) }}</div>

        <div class="q-mb-lg">
          <p class="text-subtitle1">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from 'stores/products-store';
import type { Product } from 'components/models';

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

const product = ref<Product | null>(null);
const loading = ref(false);

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
};

const goBack = () => {
  if (product.value?.userId) {
    void router.push(`/catalog/${product.value.userId}`);
  } else {
    void router.back(); // fallback para histórico do navegador
  }
};

  // TODO: implementar lógica do carrinho

  // TODO: implementar lista de desejos

const loadProduct = async () => {
  loading.value = true;
  const id = Number(route.params.id);

  // Primeiro tenta encontrar na store
  let foundProduct = productsStore.productById(id);

  // Se não encontrar, busca da API
  if (!foundProduct) {
    foundProduct = await productsStore.fetchProductById(id);
  }

  product.value = foundProduct || null;
  loading.value = false;
};

onMounted(() => {
  void loadProduct();
});
</script>
