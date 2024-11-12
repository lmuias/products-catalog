import { Product } from "../types/ProductModel";
import { client } from "./fetchClient";

export const getAllProductgs = () => {
  return client.get<Product[]>('/products');
};

export const getOneProduct = (productId: string) => {
  return client.get(`/products/${productId}`);
}

export const createNewProduct = (data: Product) => {
  return client.post<Product>('/products', data);
};

export const deleteProduct = (productId: string) => {
  return client.delete(`/products/${productId}`);
};

export const updateProduct = (productId: string, updatedProduct: Product) => {
  return client.put(`/products/${productId}`, updatedProduct);
};