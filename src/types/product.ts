export type Product = {
    id: string;
    name: string;
    seller: string;
    craft: string
    price: number;
    stars: number;
    description: string;
    details: string[];
    emoji: string;
    bg: string;
    imageUrl?: string;
}