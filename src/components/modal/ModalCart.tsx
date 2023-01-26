import { useStore } from '../../context/StoreProvider';
import './ModalCart.css';

type ModalCartProps = {
  id: number;
};

export const ModalCart = ({ id }: ModalCartProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useStore();
  const quantity = getItemQuantity(id);
  return (
    <div className='modal-cart'>
      {quantity === 0 ? (
        <button
          className='modal-cart-add'
          onClick={() => increaseCartQuantity(id)}
        >
          + Add To Cart
        </button>
      ) : (
        <div className='modal-cart-buttons'>
          <div className='modal-cart-incdec'>
            <button
              className='modal-cart-decrease'
              onClick={() => decreaseCartQuantity(id)}
            >
              -
            </button>
            <div>
              <span>{quantity}</span> in cart
            </div>
            <button
              className='modal-cart-increase'
              onClick={() => increaseCartQuantity(id)}
            >
              +
            </button>
          </div>
          <button
            className='modal-cart-remove'
            onClick={() => removeFromCart(id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
