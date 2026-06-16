import productRepository from "@/repositories/product.repo";
import { productSchema } from "@/lib/validations/product";

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
      // Validate data
      const validatedData = productSchema.parse(productData);
      return await productRepository.create(validatedData);
    } catch (error) {
      throw new Error(`Validation error: ${error.message}`);
    }
  }

  async updateProduct(id, productData) {
    try {
      // Validate data
      const validatedData = productSchema.partial().parse(productData);
      const updated = await productRepository.update(id, validatedData);
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

export default new ProductService();
