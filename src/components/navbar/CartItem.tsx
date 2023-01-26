import './CartItem.css';
import { useStore } from '../../context/StoreProvider';
import { formatCurrency } from '../../utilities/utilities';

type CartItemProps = {
  id: number;
  quantity: number;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { data, removeFromCart, decreaseCartQuantity, increaseCartQuantity } =
    useStore();

  const item = data.find((i) => i.id === id);

  const totalPrice = () => {
    return (item?.price || 0) * quantity;
  };

  if (item == null) return null;
  console.log(item);
  return (
    <div className='cart-item'>
      <img className='cart-item-image' src={item.image} alt={item.title} />
      <div className='cart-item-content'>
        <p>{item.title}</p>
        <div className='cart-item-quantity'>
          <button
            className='cart-item-dec'
            onClick={() => decreaseCartQuantity(item.id)}
          >
            -
          </button>
          <span>x{quantity}</span>
          <button
            className='cart-item-inc'
            onClick={() => increaseCartQuantity(item.id)}
          >
            +
          </button>
        </div>
        <div className='cart-item-price-content'>
          <div className='cart-item-price'>
            Item Price:{formatCurrency(item.price)}
          </div>
          <div className='cart-item-total'>
            Total Price: {formatCurrency(totalPrice())}
          </div>

          <button
            className='cart-item-remove'
            onClick={() => removeFromCart(item.id)}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};
