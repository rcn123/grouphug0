export type Product = 
{
  id: number;
  title: string; 
  price: number;
  description: string; 
  category: string; 
  created_at?: string;
}

export type ProductCreationRequest = Omit<Product, "id" | "created_at">;

