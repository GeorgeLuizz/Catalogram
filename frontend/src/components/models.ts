export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface  Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductUpdate = Partial<
  Omit<Product, "id" | "createdAt" | "updatedAt" | "userId">
>;