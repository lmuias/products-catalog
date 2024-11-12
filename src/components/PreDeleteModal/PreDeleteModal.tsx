import React from 'react';
import style from './PreDeleteModal.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/ProductModel';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { deleteOneProduct } from '../../redux/slices/productsSlice';

interface Props {
  currentProduct: Product;
  setPreDeleteModal: (e: boolean) => void;
}

export const PreDeleteModal: React.FC<Props> = ({ setPreDeleteModal,  }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleConfirmDelete = () => {
    if (productId)
    dispatch(deleteOneProduct(productId))
      .then(() => navigate('/'))
      .finally(() => window.location.reload());
  };

  const handleCancelDelete = () => {
    setPreDeleteModal(false);
  };
  
  return (
    <div className={style.block}>
    <p className={style.title}>
      Are you sure you want to delete this product?
    </p>
    <div className={style.buttons}>
      <button
        type="button"
        className={`${style.button} ${style['button--confirm']}`}
        onClick={handleConfirmDelete}
      >
        Yes
      </button>
      <button
        type="button"
        className={`${style.button} ${style['button--cancel']}`}
        onClick={handleCancelDelete}
      >
        No
      </button>
    </div>
  </div>
  );
};
