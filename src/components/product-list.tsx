import React from 'react';
import ProductCard from './product-card';
import { ProductData } from '@/types/index.type';

export default function ProductList({ data }: { data: ProductData[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.map((product, idx) => (
                <ProductCard key={idx} data={product} />
            ))}
        </div>
    );
}
