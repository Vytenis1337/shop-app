import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

type StoreProviderProps = {
  children: ReactNode;
};

type DataType = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

type SelectedId = number | null | undefined;

type StoreContextProps = {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selectedId: SelectedId;
  setSelectedId: Dispatch<SetStateAction<SelectedId>>;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
  handleClose: () => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const StoreContext = createContext({} as StoreContextProps);

export function useStore() {
  return useContext(StoreContext);
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [data, setData] = useState<DataType[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');

  const [selectedId, setSelectedId] = useState<SelectedId>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const handleClose = () => setSelectedId(null);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.dir(err));
  }, [setData]);
  return (
    <StoreContext.Provider
      value={{
        data,
        setData,
        selectedCategory,
        setSelectedCategory,
        search,
        setSearch,
        selectedId,
        setSelectedId,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
        isOpen,
        handleClose,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
