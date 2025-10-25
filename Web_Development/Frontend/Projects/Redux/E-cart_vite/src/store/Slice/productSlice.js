import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchProductData = () => (dispatch) => {
//   dispatch(isfetchLoading());
//   dispatch(isfetchLoading());
//   fetch("https://fakestoreapi.com/products")
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch(updateAllProducts(data));
//     })
//     .catch((error) => {
//       dispatch(isfetchError());
//     });
// };

export const fetchProductDataAsync = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const respose = await fetch("https://fakestoreapi.com/products");
      return respose.json();
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
//   reducers: {
//     isfetchLoading(state) {
//       state.loading = true;
//     },
//     isfetchError(state, action) {
//       state.loading = false;
//       state.error = action.payload || "SomeThing Went Wrong";
//     },
//     updateAllProducts(state, action) {
//       state.loading = false;
//       state.list = action.payload;
//     },
//   },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDataAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const getProductList = (state) => state.productList.list;
export const getProductIsLoading = (state) => state.productList.loading;
export const getProductError = (state) => state.productList.error;

export default productSlice.reducer;

// export const { updateAllProducts, isfetchLoading, isfetchError } =
//   productSlice.actions;
