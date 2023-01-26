import { useStore } from '../../context/StoreProvider';
import './Search.css';

export const Search = () => {
  const { setSearch } = useStore();

  const handleChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <input
      type='text'
      placeholder='Search...'
      className='side-menu-search'
      onChange={handleChange}
    />
  );
};
