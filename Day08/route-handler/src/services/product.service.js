import * as repo from "@/repositories/product.repo";

export async function getAllProducts() {
  return repo.getProducts();
}

export async function getProduct(id) {
  return repo.getProductById(id);
}

export async function addProduct(data) {
  return repo.createProduct(data);
}

export async function editProduct(id, data) {
  return repo.updateProduct(id, data);
}

export async function removeProduct(id) {
  return repo.deleteProduct(id);
}
