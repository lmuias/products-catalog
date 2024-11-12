  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
  import { createNewProduct, deleteProduct, getAllProductgs, getOneProduct, updateProduct } from "../../api/productsApi";
  import { Product } from "../../types/ProductModel";

  interface ProductsState {
    products: Product[];
    loadingProduct: boolean;
    loadingError: string;
    creatingProduct: boolean; 
    creatingError: string;
    selectedProduct: Product | null;
  }

  const initialState: ProductsState = {
    products: [],
    loadingProduct: false,
    loadingError: '',
    creatingProduct: false,
    creatingError: '',
    selectedProduct: null,
  };

  export const fetchProducts = createAsyncThunk('products/fetchProducts', () =>
    getAllProductgs(),
  );

  export const deleteOneProduct = createAsyncThunk('products/fetchProducts', async (productId: string) =>
    await deleteProduct(productId),
  );

  export const fetchOneProduct = createAsyncThunk<Product, string>('products/fetchProduct', async (productId: string) => {
    const response = await getOneProduct(productId);
    return response as Product;
  });

  export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product: Product, { rejectWithValue }) => {
      try {
        const newProduct = await createNewProduct(product);
        return newProduct;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  );

  export const updateExistingProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, updatedProduct }: { productId: string, updatedProduct: Product }, { rejectWithValue }) => {
      try {
        const updatedProductResponse = await updateProduct(productId, updatedProduct);
        return updatedProductResponse as Product;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('An unknown error occurred');
      }
    }
  );

  export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
      builder
      .addCase(fetchProducts.pending, state => {
        state.loadingProduct = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        return { ...state, products: action.payload, loadingProduct: false };
      })
      .addCase(fetchProducts.rejected, state => {
        state.loadingError = 'Error loading products';
        state.loadingProduct = false;
      })
      .addCase(fetchOneProduct.pending, (state) => {
        state.loadingProduct = true;
        state.selectedProduct = null;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
        state.loadingProduct = false;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.loadingError = 'Error loading product';
        state.loadingProduct = false;
      })
      .addCase(createProduct.pending, state => {
        state.creatingProduct = true;
        state.creatingError = '';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
        state.creatingProduct = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creatingError = action.payload as string;
        state.creatingProduct = false;
      });
    },
  })

  export default productsSlice.reducer;