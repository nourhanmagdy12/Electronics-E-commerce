export interface IProduct {
    id: number;
    name: string;
    price: number;
    rating: number;
    reviews_count?: number;
    description: string;
    image_url: string;
    manufacturer?: string;
    full_description?: string;
    specifications_json?: any;
    quantity?: number;
}

