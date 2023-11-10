import { createSlice } from "@reduxjs/toolkit";
import { getCarsByFilterThunk, getCarsThunk } from "./thunks";

const initialState = {
  cars: [],
  favoriteCars: [],
  filteredCars: [],
  isLoading: false,
  page: 1,
  limit: 12,
  reachOut: false,
  modalId: null,
};

export const carSlicer = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setModalId: (state, { payload }) => {
      state.modalId = payload;
    },
    setEmptyCarsList: (state) => {
      state.cars = [];
      state.filteredCars = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarsThunk.fulfilled, (state, { payload }) => {
        state.cars.push(...payload);
        state.filteredCars = [];
        state.page++;
        payload.length < 12
          ? (state.reachOut = true)
          : (state.reachOut = false);
      })
      .addCase(getCarsThunk.rejected, (state) => {
        state.reachOut = true;
      })
      .addCase(getCarsByFilterThunk.fulfilled, (state, { payload }) => {
        state.filteredCars = [];
        state.filteredCars.push(...payload);
      });
  },
});

export const carsReducer = carSlicer.reducer;
export const { setModalId, setEmptyCarsList } = carSlicer.actions;
