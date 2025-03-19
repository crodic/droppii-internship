'use client';

import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import ShippingIcon from './icons/shipping-icon';
import BoxIcon from './icons/box-icon';
import HeartIcon from './icons/heart-icon';
import { ProductData } from '@/types/index.type';
import { cn, formatDate, formatNumber, formatVietnamCurrency } from '@/lib/utils';
import useWishList from '@/stores/use-wish-list';
import { Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Props {
    data: ProductData;
}

export default function ProductCard({ data }: Props) {
    const wishList = useWishList((state) => state.wishList);
    const addWishList = useWishList((state) => state.addWishList);
    const isWishList = wishList.some((item) => item.id === data.id);

    const handleAddWishList = () => {
        addWishList(data);
        toast({
            title: `${isWishList ? 'Đã xóa sản phẩm khỏi' : 'Đã thêm sản phẩm vào'} danh sách yêu thích`,
            variant: isWishList ? 'destructive' : 'default',
        });
    };

    return (
        <Card className="max-w-[183px] w-full overflow-hidden">
            <CardContent className="p-0 rounded-lg cursor-pointer">
                <div className="card-image relative">
                    <Image src="/sp1.webp" alt="sp1" width={183} height={179} />
                    {data.discountPercentage > 0 && (
                        <span className="absolute top-0 left-0 bg-red-500 text-white p-1 text-[10px] leading-[16px]">
                            - {data.discountPercentage}%
                        </span>
                    )}
                    <div className="absolute bottom-0 left-0 flex rounded-tr-md overflow-hidden">
                        {data.isFreeShipping && (
                            <div className="flex items-center p-1 bg-[#12b76a] gap-1">
                                <ShippingIcon />
                                <span className="text-[10px] leading-[16px] text-white font-bold">FREE</span>
                            </div>
                        )}
                        {data.isGiftWrap && (
                            <div className="flex items-center p-1 bg-[#FFE2B8] gap-1">
                                <BoxIcon />
                                <span className="text-[10px] leading-[16px] text-[#CC7600] font-bold">Quà tặng</span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => handleAddWishList()}
                        className={cn(
                            'absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-black/20 transition-colors duration-150',
                            isWishList && 'bg-red-200'
                        )}
                    >
                        {isWishList ? <Heart fill="red" stroke="red" size={16} /> : <HeartIcon />}
                    </button>
                </div>
                <div className="card-content p-2 flex flex-col">
                    {data.salesTime && (
                        <div className="flex justify-center items-center bg-[#ffe7ed] rounded-md overflow-hidden">
                            <Image
                                src="/sales.png"
                                width={61}
                                height={14}
                                alt="flash-sales"
                                className="object-contain"
                            />
                            <span className="text-[10px] leading-[16px] text-[#e62f59] font-medium">
                                {' '}
                                •{formatDate(data.salesTime)}
                            </span>
                        </div>
                    )}

                    <p className="card-title line-clamp-2 text-[13px] leading-[20.8px] text-[#393240] font-medium">
                        {data.title}
                    </p>

                    <div className="card-price text-[#f79009] text-[14px] leading-[22.4px] font-semibold">
                        <span className="underline">đ</span> {formatVietnamCurrency(data.price)}
                    </div>
                    {data.sold > 0 && (
                        <p className="card-sold text-[#5c6366] text-xs leading-[19.2px]">
                            {formatNumber(data.sold)} Đã bán
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
