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

export const formatDate = (dateString: string) => {
    const timeZone = 'Asia/Ho_Chi_Minh';
    const date = toZonedTime(dateString, timeZone);
    return format(date, 'HH:mm•dd/MM');
};

export const formatNumber = (num: number) => {
    if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'k';
    }
    return num.toString();
};
