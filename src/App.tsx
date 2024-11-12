import { Outlet } from 'react-router-dom';
import style from './App.module.scss';
import { useAppDispatch } from './redux/hooks/hooks';
import { fetchProducts } from './redux/slices/productsSlice';
import { useEffect } from 'react';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <main className={style.main}>
      <Outlet />
    </main>
  )
}
