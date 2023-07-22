export interface IProduct extends Document {
  brand: string;
  model: string;
  sku: number;
  price: number;
  quantity: number;
}
