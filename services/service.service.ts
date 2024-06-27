import Product from '../models/service.model';
import { Document } from 'mongoose';

interface ProductDocument extends Document {
  name: string;
  price: number;
  business: string;
}

export const createProduct = async (name: string, price: number, businessId: string): Promise<ProductDocument> => {
  const product = new Product({ name, price, business: businessId });
  await product.save();
  return product;
};

export const updateProduct = async (id: string, name: string, price: number): Promise<ProductDocument | null> => {
  return await Product.findByIdAndUpdate(id, { name, price }, { new: true });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await Product.findByIdAndDelete(id);
};
