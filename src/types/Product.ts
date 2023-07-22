export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
export type Products = Product[] | null;
