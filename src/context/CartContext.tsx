import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, warrantyUpgrade?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  gstAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  quoteProducts: Product[];
  openQuoteForProduct: (product: Product) => void;
  openQuoteForCart: () => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart/compare after mount so server and client markup match
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('barfreezer_cart_v2');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedCompare = localStorage.getItem('barfreezer_compare_v2');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));
    } catch {}
    setHydrated(true);
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProducts, setQuoteProducts] = useState<Product[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('barfreezer_cart_v2', JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('barfreezer_compare_v2', JSON.stringify(compareList));
    } catch {}
  }, [compareList, hydrated]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, warrantyUpgrade = false) => {
    // Products without a published price cannot be bought online: route to a quote request.
    if (product.price == null) {
      setQuoteProducts([product]);
      setIsQuoteModalOpen(true);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, warrantyUpgrade: warrantyUpgrade || item.warrantyUpgrade }
            : item
        );
      }
      return [...prev, { product, quantity, warrantyUpgrade }];
    });
    showNotification(`Added ${product.name} to cart.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removed from cart.');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openQuoteForProduct = (product: Product) => {
    setQuoteProducts([product]);
    setIsQuoteModalOpen(true);
  };

  const openQuoteForCart = () => {
    if (cart.length === 0) {
      showNotification('Your cart is empty. Add equipment before requesting a multi-product trade quote.');
      return;
    }
    setQuoteProducts(cart.map((c) => c.product));
    setIsCartOpen(false);
    setIsQuoteModalOpen(true);
  };

  const toggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showNotification(`Removed ${product.name} from comparison.`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showNotification('You can compare a maximum of 4 items side-by-side.');
        return prev;
      }
      showNotification(`Added ${product.name} to comparison.`);
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some((p) => p.id === productId);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);
  const gstAmount = Math.round(subtotal / 11);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        gstAmount,
        isCartOpen,
        setIsCartOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        quoteProducts,
        openQuoteForProduct,
        openQuoteForCart,
        notification,
        showNotification,
        compareList,
        toggleCompare,
        isInCompare
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
