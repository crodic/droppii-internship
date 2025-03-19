import ProductList from '@/components/product-list';
import { PaginationWithLinks } from '@/components/ui/pagination-with-link';
import { delayRequest } from '@/lib/utils';
import { mockProducts } from '@/mocks/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Danh sách sản phẩm',
};

const PER_PAGE_DEFAULT = 12;

export default async function HomePage({ searchParams }: { searchParams: { [key: string]: string } }) {
    const page = isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page);
    const data = await delayRequest(3000, mockProducts, { perPage: PER_PAGE_DEFAULT, page });
    return (
        <div className="flex justify-center gap-8 items-center min-h-svh flex-col p-6">
            <h1 className="text-2xl font-semibold">Danh sách sản phẩm</h1>
            <PaginationWithLinks page={Number(page)} pageSize={PER_PAGE_DEFAULT} totalCount={mockProducts.length} />
            <ProductList data={data} />
            <PaginationWithLinks page={Number(page)} pageSize={PER_PAGE_DEFAULT} totalCount={mockProducts.length} />
        </div>
    );
}
