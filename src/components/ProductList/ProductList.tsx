import React, { useEffect } from 'react';
import style from './ProductList.module.scss';
import { Product } from '../../types/ProductModel';
import { ProductCard } from '../ProductCard';
import { useSearchParams } from 'react-router-dom';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByName = searchParams.get('sortByName') || 'desc';
  const sortByCount = searchParams.get('sortByCount') || 'desc';

  const handleNameSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sortByName: event.target.value, sortByCount });
  };

  const handlePriceSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sortByName, sortByCount: event.target.value });
  };

  const sortedProducts = [...products]
    .sort((a, b) => {
      if (sortByName === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    })
    .sort((a, b) => {
      if (sortByCount === 'asc') {
        return a.count - b.count;
      } else {
        return b.count - a.count;
      }
    });

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div className={style.list}>
      <div className={style.filters}>
        <div>
          <label>Sort by Name:</label>
          <select onChange={handleNameSortChange} value={sortByName}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div>
          <label>Sort by Price:</label>
          <select onChange={handlePriceSortChange} value={sortByCount}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {sortedProducts?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};