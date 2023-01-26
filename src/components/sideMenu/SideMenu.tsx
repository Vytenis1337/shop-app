import './SideMenu.css';
import { useStore } from '../../context/StoreProvider';

export const SideMenu = () => {
  const { data, setSelectedCategory, setSearch } = useStore();

  const cats = [...new Set(data.map((q) => q.category))];

  const uniqueId = () => Math.floor(Date.now() * Math.random()).toString();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const element = event.currentTarget as HTMLInputElement;
    const value = element.textContent;
    setSearch('');
    setSelectedCategory(value);
  };

  const handleClickAll = () => {
    setSearch('');
    setSelectedCategory('');
  };

  return (
    <div className='side-menu-cats'>
      <button className='side-menu-cat side-menu-all' onClick={handleClickAll}>
        All
      </button>
      {cats.map((item) => {
        return (
          <button
            className='side-menu-cat'
            onClick={handleClick}
            key={uniqueId()}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};
