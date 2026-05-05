<template>
  <q-card class="full-height cursor-pointer hover-shadow" @click="navigateToProduct">
    <q-img
      v-if="product.imageUrl"
      :src="product.imageUrl"
      :alt="product.name"
      style="height: 200px"
      fit="cover"
    />
    <q-card-section class="q-pb-xs">
      <div class="text-h6 ellipsis">{{ product.name }}</div>
    </q-card-section>

    <q-card-section class="q-py-xs">
      <p class="text-body2 ellipsis-2 q-ma-none">{{ product.description }}</p>
    </q-card-section>

    <q-separator />

    <q-card-section class="row items-center justify-between q-py-md">
      <div>
        <div class="text-subtitle2 text-weight-bold text-primary">
          R$ {{ formatPrice(product.price) }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from 'components/models';
import { useRouter } from 'vue-router';

interface Props {
  product: Product;
}

const props = defineProps<Props>();

const router = useRouter();

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
};

const navigateToProduct = () => {
  void router.push(`/products/${props.product.id}`);
};
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover-shadow:hover {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
</style>
