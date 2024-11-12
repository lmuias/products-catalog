import React, { useState } from 'react';
import style from './EditingForm.module.scss';
import { PreDeleteModal } from '../PreDeleteModal';
import { LoaderButton } from '../LoaderButton';
import { Product } from '../../types/ProductModel';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { createProduct, updateExistingProduct } from '../../redux/slices/productsSlice';
import { Comment } from '../../types/CommentModel';

interface Props {
  creating?: boolean;
  currentProduct: Product;
  isEditWindowOpen: boolean;
  setIsEditWindowOpen: (e: boolean) => void;
}

export const EditingForm: React.FC<Props> = ({ currentProduct, isEditWindowOpen, setIsEditWindowOpen, creating }) => {
  const { id, imageUrl, name, count, weight, size, comments } = currentProduct;
  const [preDeleteModal, setPreDeleteModal] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { products } = useAppSelector(state => state.products);
  const dispatch = useAppDispatch();
  const [commentText, setCommentText] = useState('');

  const [productState, setProductState] = useState({
    id,
    imageUrl,
    name,
    count,
    weight,
    size,
    comments,
  });

  const validateFields = (): boolean => {
    if (
      !productState.imageUrl.trim() ||
      !productState.name.trim() ||
      productState.count === 0 ||
      !productState.weight.trim() ||
      productState.size.height === 0 ||
      productState.size.height === 0 ||
      !productState.weight.trim()
    ) {
      setError('All fields are required and cannot be empty or just spaces.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmitChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsButtonLoading(true);

    if (creating) {
      const newProductId = (products.length + 1).toString();
      const productToCreate = {...productState, id: newProductId};

      dispatch(createProduct(productToCreate))
        .catch((err) => console.log(err))
        .finally(() => setIsButtonLoading(false))
        .finally(() => window.location.reload());

    } else {
      const updatedProduct = {
        ...productState,
      }

      dispatch(updateExistingProduct({ productId: productState.id, updatedProduct }))
      .catch((err) => console.log(err))
      .finally(() => setIsButtonLoading(false))
      .finally(() => window.location.reload());
    }

  };

  const commentChange = (commentId: number, newDescription: string) => {
    const updatedComments = productState.comments.map((comment) =>
      +comment.id === commentId ? { ...comment, description: newDescription } : comment
    );
    setProductState({ ...productState, comments: updatedComments });
  };

  const addNewComment = () => {
    if (commentText.trim() === '') return;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(',', '');

    const newComment: Comment = {
      id: (productState.comments.length + 1).toString(),
      productId: productState.id,
      description: commentText,
      date: formattedDate,
    };

    const updatedProduct = {
      ...productState,
      comments: [...productState.comments, newComment],
    }

    dispatch(updateExistingProduct({ productId: productState.id, updatedProduct }))
    .then(() => setProductState(updatedProduct))
    .catch((err) => console.log(err))
    .finally(() => window.location.reload())

  setCommentText('');
  };


  return (
    <div className={classNames(style.block, { [style['block--open']]: !isEditWindowOpen })}>
      <div className={style.top}>
        {!creating && (
          <button
            type='button' 
            className={style.close}
            onClick={() => setPreDeleteModal(true)}
          >
            <svg
              className={style.svg}
            >
              <use href='/sprite.svg#icon-bin'></use>
            </svg>
          </button>
        )}
        <h3 className={style.title}>{creating ? 'Add new product' : 'Edit product info'}</h3>
        <button
          type='button' 
          className={style.close}
          onClick={() => setIsEditWindowOpen(false)}
        >
          <svg
            className={style.svg}
          >
            <use href='/sprite.svg#icon-cross'></use>
          </svg>
        </button>
      </div>
      <form className={style.form} onSubmit={(e) => handleSubmitChanges(e)}>
        <label className={style.label}>
          Name: 
          <input 
            type="text" 
            className={style.input} 
            value={productState.name} 
            onChange={(e) => setProductState({...productState, name: e.target.value})}
          />
        </label>
        <label className={style.label}>
          Weight: 
          <input 
            type="text" 
            className={style.input} 
            value={productState.weight} 
            onChange={(e) => setProductState({...productState, weight: e.target.value})}
          />
        </label>
        <label className={style.label}>
          Width: 
          <input 
            type="text" 
            className={style.input} 
            value={productState.size.width} 
            onChange={(e) => setProductState({...productState, size: {height: productState.size.height, width: +e.target.value}})}
          />
        </label>
        <label className={style.label}>
          Height: 
          <input 
            type="text" 
            className={style.input} 
            value={productState.size.height} 
            onChange={(e) => setProductState({...productState, size: {width: productState.size.width, height: +e.target.value}})}
          />
        </label>
        <label className={style.label}>
          Count: 
          <input 
            type="number" 
            className={style.input} 
            value={productState.count} 
            onChange={(e) => setProductState({...productState, count: +e.target.value})}
          />
        </label>
        <label className={style.label}>
          ImageUrl: 
          <input 
            type="text" 
            className={style.input} 
            value={productState.imageUrl} 
            onChange={(e) => setProductState({...productState, imageUrl: e.target.value})}
          />
        </label>
        <label>
          Add comment:
          <input 
            type="text"
            className={style.input} 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)} 
          />
        </label>
        <button type="button" onClick={addNewComment} className={style.button}>Add Comment</button>
        {productState.comments.map((comment) => (
          <div key={comment.id}>
            <label>{comment.description}
              <input 
                type="text"
                className={style.input} 
                value={comment.description} 
                onChange={(e) => commentChange(+comment.id, e.target.value)} 
              />
            </label>
          </div>
        ))}
  
        {error && <p className={style.error}>{error}</p>} 

        {!isButtonLoading ? (
          <button type='submit' className={style.button}>{creating ? 'Add new product?' : 'Confirm changes?'}</button>
        ) : (
          <LoaderButton />
        )}
        <button 
          type='button' 
          className={`${style.button} ${style['button--cancel']}`}
          onClick={() => setIsEditWindowOpen(false)}
        >
          {creating ? 'Cancel adding' : 'Cancel changes?'}
        </button>
      </form>

      {preDeleteModal && <PreDeleteModal setPreDeleteModal={setPreDeleteModal} currentProduct={currentProduct} />}
    </div>
  );
};