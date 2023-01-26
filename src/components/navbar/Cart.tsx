import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreProvider';
import { CartItem } from './CartItem';
import './Cart.css';
import { useEscapeKey } from '../../hooks/useEscKey';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useRef } from 'react';
import { formatCurrency } from '../../utilities/utilities';

export const Cart = () => {
  const { isOpen, closeCart, data, cartItems } = useStore();
  const cartRef = useRef(null);

  const cartBg = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  useEscapeKey(closeCart);
  useOutsideClick(closeCart, cartRef);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={cartBg}
          initial='hidden'
          animate='visible'
          className='cart-bg'
        >
          <div className='cart-modal' ref={cartRef}>
            <h1 className='cart-title'>Shopping Cart</h1>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className='cart-modal-sum'>
              Total Ammount:
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = data.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
              <button className='cart-modal-button' onClick={closeCart}>
                Close Cart
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
