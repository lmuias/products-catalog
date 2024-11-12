import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProductDetail } from "./pages/ProductDetail";

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index  element={<MainPage />} />
        <Route path="products/:productId" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
};