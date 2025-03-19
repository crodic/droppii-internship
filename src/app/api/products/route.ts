import { mockProducts } from '@/mocks/data';
import { NextRequest, NextResponse } from 'next/server';

const PER_PAGE_DEFAULT = 12;

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get('page');
        const pageNumber = isNaN(Number(page)) ? 1 : Number(page);

        const startIndex = (pageNumber - 1) * PER_PAGE_DEFAULT;
        const endIndex = startIndex + PER_PAGE_DEFAULT;
        const sliceData = mockProducts.slice(startIndex, endIndex);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        return NextResponse.json(sliceData, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
};
