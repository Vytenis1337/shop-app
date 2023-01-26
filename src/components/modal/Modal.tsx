import './Modal.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreProvider';
import { ModalCart } from './ModalCart';
import { useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useEscapeKey } from '../../hooks/useEscKey';
import { formatCurrency } from '../../utilities/utilities';

export const Modal = () => {
  const { data, selectedId, setSelectedId, handleClose } = useStore();
  const modalRef = useRef(null);
  const motionBg = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  useOutsideClick(handleClose, modalRef);

  useEscapeKey(handleClose);
  return (
    <AnimatePresence>
      {selectedId && (
        <motion.div
          variants={motionBg}
          initial='hidden'
          animate='visible'
          className='motion-bg'
        >
          <div className='modal' ref={modalRef}>
            {data
              .filter((item) => item.id === selectedId)
              .map(
                (filteredPerson: {
                  image: string;
                  id: number;
                  title: string;

                  price: number;
                }) => (
                  <div className='modal-content' key={filteredPerson.id}>
                    <div className='modal-item'>
                      <img
                        className='modal-image'
                        src={filteredPerson.image}
                        alt={filteredPerson.title}
                      />
                      <h5 className='modal-title'>{filteredPerson.title}</h5>
                      <h2 className='modal-price'>
                        {formatCurrency(filteredPerson.price)}
                      </h2>
                    </div>

                    <ModalCart id={filteredPerson.id} />

                    <button
                      className='modal-close'
                      onClick={() => setSelectedId(null)}
                    >
                      Close Modal
                    </button>
                  </div>
                )
              )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
