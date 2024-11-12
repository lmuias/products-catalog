import style from './LoaderButton.module.scss';

export const LoaderButton = () => (
  <button type='button' className={style.button} data-cy="Loader">
    <div className={style.content} />
  </button>
);
