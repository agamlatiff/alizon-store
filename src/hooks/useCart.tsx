import type { TCart } from "@/types";
import { create } from "zustand";
import {createJSONStorage, persist} from 'zustand/middleware'

interface CartState {
  products: TCart[]
  isOpen: boolean
  addProduct : (cart : TCart) => void
  increaseQuantity : (id: string) => void
  decreaseQuantity : (id: string) => void
  removeProduct : (id: string) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}


export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      isOpen: false,
      addProduct : (cart) => {
        const existingProduct = get().products.find((item) => item.id === cart.id);
        if (existingProduct) {
          get().increaseQuantity(cart.id);
        } else {
          set({
            products: [...get().products, cart]
          });
        }
        set({ isOpen: true }); // Open cart when adding product
      },
      increaseQuantity: (id) => {
        const newProducts = get().products.map((item) => {
          if(item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        set({
          products: newProducts
        })
      },
      decreaseQuantity:  (id) => {
        const newProducts = get().products.map((item) => {
          if(item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        set({
          products: newProducts.filter(item => item.quantity !== 0)
        })
      },
      removeProduct: (id) => set({
        products: [...get().products.filter(item => item.id !== id)]
      }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: 'cart-product-belanja',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)