import { Link } from 'react-router-dom';
import style from './ProductCard.module.scss';
import { Product } from '../../types/ProductModel';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, imageUrl, name, count, size, weight } = product;

  return (
    <Link 
      to={`/products/${id}`} 
      className={style.item}
    >
      <div className={style.image} style={{ backgroundImage: `url(${imageUrl})` }}   />
      <h3 className={style.name}>{name}</h3>
      <p className={style.text}>Count: {count}</p>
      <p className={style.text}>Height: {size.height}</p>
      <p className={style.text}>Width: {size.width}</p>
      <p className={style.text}>Weight: {weight}</p>
    </Link>
  );
};