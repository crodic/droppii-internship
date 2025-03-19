import { ProductData } from '@/types/index.type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatVietnamCurrency(value: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return formatter.format(value).replace('.', ',').replace('₫', '').trim();
}

export const delayRequest = (
    ms: number,
    data: ProductData[],
    options: { perPage: number; page: number }
): Promise<ProductData[]> => {
    const startIndex = (options.page - 1) * options.perPage;
    const endIndex = startIndex + options.perPage;
    const sliceData = data.slice(startIndex, endIndex);
    return new Promise((resolve) => setTimeout(() => resolve(sliceData), ms));
};

export const formatDate = (dateString: string) => {
    const timeZone = 'Asia/Ho_Chi_Minh'; // Điều chỉnh theo múi giờ của bạn
    const date = toZonedTime(dateString, timeZone);
    return format(date, 'HH:mm•dd/MM');
};
