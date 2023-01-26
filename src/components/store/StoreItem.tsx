import './StoreItem.css';
import { useStore } from '../../context/StoreProvider';

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const StoreItem = ({ image, title, price, id }: StoreItemProps) => {
  const { setSelectedId } = useStore();

  return (
    <div className='product' onClick={() => setSelectedId(id)}>
      <img className='product-image' src={image} alt={title} />
      <div className='product-title'>{title}</div>
      <div className='product-price'>${price}</div>
    </div>
  );
};
