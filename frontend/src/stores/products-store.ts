import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Product, ProductUpdate } from 'components/models';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    loading: false,
    error: null,
  }),

  getters: {
    productById: (state) => (id: number) => {
      return state.products.find((p) => p.id === id);
    },
  },

  actions: {
    async fetchProducts(userId: string) {
      this.loading = true;
      this.error = null;

      try {
        const url = `/api/catalog/${userId}`;
        console.log('🌐 Requisição GET:', url);
        
        const response = await fetch(url);
        console.log('📊 Status da resposta:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        this.products = await response.json();
        console.log('✨ Produtos recebidos:', this.products);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        this.error = errorMessage;
        console.error('❌ Erro ao buscar produtos:', errorMessage);
        this.products = [];
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id: number) {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Produto não encontrado');
        }
        return await response.json();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erro desconhecido';
        return null;
      }
    },

    addProduct(product: Product) {
      if (!this.products.find((p) => p.id === product.id)) {
        this.products.push(product);
      }
    },

    removeProduct(id: number) {
      this.products = this.products.filter((p) => p.id !== id);
    },

    updateProduct(id: number, updates: ProductUpdate) {
      const index = this.products.findIndex((p) => p.id === id);

      if (index > -1) {
        const currentProduct = this.products[index];

        this.products[index] = { ...currentProduct, ...updates } as Product;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductsStore, import.meta.hot));
}
