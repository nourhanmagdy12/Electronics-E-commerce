export interface ISpecifications {
  [key: string]: string | number; 
}

export interface IProduct {
   product_id: number;
  name: string;
  price: number;
  rating: number;
  reviews_count: number;
  description: string;   
  image_url: string;
  category_id: number;
  manufacturer: string;
  model_number: string;
  full_description: string;  
  specifications_json: ISpecifications;
}
