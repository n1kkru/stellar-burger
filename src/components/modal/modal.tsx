import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const nav = useNavigate();
  
  const onCloseModal = () => {
    if (!onClose) {
      nav(-1);
    }
    else {
      onClose();
    }
  }
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onCloseModal();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onCloseModal}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
