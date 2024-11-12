import { Link, useParams } from 'react-router-dom';
import style from './ProductDetail.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchOneProduct } from '../../redux/slices/productsSlice';
import { Loader } from '../../components/Loader';
import { EditingForm } from '../../components/EditingForm';

export const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(true);
  const product = useAppSelector((state) => state.products.selectedProduct);
  const loadingError = useAppSelector((state) => state.products.loadingError);
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchOneProduct(productId))
      .then(() => setLoader(false));
    }

    console.log(productId, product)
  }, [productId, dispatch]);
  
  if (loadingError) {
    return <div>{loadingError}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }


  return (
    loader ? (<Loader />) : (
      <div className={style.section}>
        <div className={style.navigation}>
        <Link to={'/'} className={style.button}>Prev page</Link>
        <button 
          type='button' 
          className={style.button}
          onClick={() => setIsEditWindowOpen(true)}
        >
          Edit product information
        </button>
        </div>
        <h2 className={style.title}>{product.name}</h2>
        <div className={style.info}>
          <div className={style.image} style={{ backgroundImage: `url(${product.imageUrl})` }}   />
          <p className={style.text}>Count: {product.count}</p>
          <p className={style.text}>Height: {product.size.height}</p>
          <p className={style.text}>Width: {product.size.width}</p>
          <p className={style.text}>Weight: {product.weight}</p>
        </div>
        <div className={style.content}>
          <p className={style.title}>Comments:</p>
          <div className={style.comments}>
            {product.comments.map(comment => (
              <div className={style.comment} key={comment.id}>
                <p className={style.text}>Comment Date: {comment.date}</p>
                <p className={style.text}>Comment ProductId: {comment.productId}</p>
                <p className={style.text}>Comment Id: {comment.id}</p>
                <p className={style.text}>Comment Description: {comment.description}</p>
              </div>
            ))}
          </div>
        </div>
        {product && 
        <EditingForm 
          isEditWindowOpen={isEditWindowOpen} 
          currentProduct={product} 
          setIsEditWindowOpen={setIsEditWindowOpen}
        />
      }
      </div>
    )
  );
};