export interface ProductData {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    sold: number;
    thumbnail: string;
    isFreeShipping?: boolean;
    isGiftWrap?: boolean;
    salesTime?: string;
}
