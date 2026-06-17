import productRepository from "@/repositories/product.repo";

class ProductService {
  async getAllProducts() {
    try {
      return await productRepository.findAll();
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const product = await productRepository.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error(`Error fetching product: ${error.message}`);
    }
  }

  async createProduct(productData) {
    try {
      return await productRepository.create(productData);
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async updateProduct(id, productData) {
    try {
      const updated = await productRepository.update(id, productData);
      if (!updated) {
        throw new Error("Product not found");
      }
      return updated;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(id) {
    try {
      const deleted = await productRepository.delete(id);
      if (!deleted) {
        throw new Error("Product not found");
      }
      return true;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
