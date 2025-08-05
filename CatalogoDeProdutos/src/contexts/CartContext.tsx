import { createContext, useContext, useState, type ReactNode } from 'react';

// 🧩 Tipo base do produto
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// 🛒 Tipo do item no carrinho
export type CartItem = Product & {
  quantity: number;
};

// 🧠 Tipagem do contexto
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

// 🎯 Criação do contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 🎁 Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ➕ Adiciona ou incrementa produto
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // ➖ Remove ou decrementa produto
  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (!existingItem) return prev;

      if (existingItem.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prev.filter((item) => item.id !== id);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 🪝 Hook personalizado
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
};