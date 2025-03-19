import { ProductData } from '@/types/index.type';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
    wishList: ProductData[];
};

type Action = {
    addWishList: (product: ProductData) => void;
};

type Store = State & Action;

const initialState: State = {
    wishList: [],
};

const useWishList = create<Store, [['zustand/immer', never]]>(
    immer((set) => ({
        ...initialState,
        addWishList: (product) =>
            set((state) => {
                const isExistProduct = state.wishList.some((item) => item.id === product.id);
                if (isExistProduct) {
                    state.wishList = state.wishList.filter((item) => item.id !== product.id);
                } else {
                    state.wishList.push(product);
                }
            }),
    }))
);

export default useWishList;
