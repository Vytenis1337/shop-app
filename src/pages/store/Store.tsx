import { useMemo } from 'react';
import { SideMenu } from '../../components/sideMenu/SideMenu';
import { Search } from '../../components/sideMenu/Search';
import { Modal } from '../../components/modal/Modal';
import { useStore } from '../../context/StoreProvider';
import './Store.css';
import { StoreItem } from '../../components/store/StoreItem';
import { Loading } from '../../components/store/Loading';

export const Store = () => {
  const { data, loading, selectedCategory, search } = useStore();

  const getFilteredList = () => {
    if (!selectedCategory) {
      return data;
    }

    return data.filter((item) => item.category === selectedCategory);
  };

  let filteredList = useMemo(getFilteredList, [selectedCategory, data]);

  return (
    <div className='store'>
      <div className='side-menu'>
        <Search />

        <SideMenu />
      </div>

      <div className='content'>
        {loading && <Loading />}
        {data && (
          <div className='products'>
            {filteredList
              .filter((item: { title: string }) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.title.toLowerCase().includes(search);
              })
              .map((product) => {
                return <StoreItem key={product.id} {...product} />;
              })}
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
};
