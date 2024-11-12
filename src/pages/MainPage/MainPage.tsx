import { useState } from 'react';
import style from './MainPage.module.scss';
import { EditingForm } from '../../components/EditingForm';
import { ProductList } from '../../components/ProductList';
import { useAppSelector } from '../../redux/hooks/hooks';

export const MainPage = ( ) => {
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const { products } = useAppSelector(state => state.products);
  const product = {
    id: "0",
    imageUrl: '',
    name: '',
    count: 1,
    weight: '',
    size: {
      height: 200,
      width: 200,
    },
    comments: [],
  }


  return (
    <section className={style.container}>
      <div className={style.text}>
        <h1 className={style.title}>Product catalog</h1>
        <p className={style.description}>
        Welcome to the Product Catalog! This is your go-to destination for discovering a diverse range of high-quality products from various categories.
        Each item in this catalog includes detailed descriptions, key features, and specifications, giving you all the information you need to make informed decisions.
        Whether you're shopping for the latest tech gadgets, home essentials, or fashion must-haves, this catalog has something for everyone. 
        Dive in to explore our curated selection, read customer reviews, and find the perfect product to fit your needs!
        </p>
      </div>
      <button type='button' className={style.button} onClick={() => setIsEditWindowOpen(!isEditWindowOpen)}>Add new product</button>
      <EditingForm 
        isEditWindowOpen={isEditWindowOpen} 
        currentProduct={product} 
        setIsEditWindowOpen={setIsEditWindowOpen}
        creating={true}
      />
      <ProductList products={products} />
    </section>
  );
};