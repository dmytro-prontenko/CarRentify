import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { setEmptyCarsList, setFilteredCars, setReachOut } from "../../redux/carsReducer";
import { getCarsByFilterThunk } from "../../redux/thunks";
import {
  StyledToError
} from "./SearchFormMobile.styled";
import { StyledFormMobile, StyledFromErrorMobile, StyledInputWrapperMobile, StyledMileageFromInputMobile, StyledMileageToInputMobile, StyledSearchButtonMobile, StyledSpanMobile } from "./SearchFormMobile.styled";
import { makeStyles, priceStyles } from "./SelectMobile.styles";

const price = [];

const defaultValues = {
  make: null,
  price: null,
  mileageFrom: null,
  mileageTo: null,
};

for (let index = 1; index <= 15; index++) {
  price.push({ value: `${index * 10}`, label: `${index * 10}` });
}

const makes = [
  { value: "Buick", label: "Buick" },
  { value: "Volvo", label: "Volvo" },
  { value: "HUMMER", label: "HUMMER" },
  { value: "Subaru", label: "Subaru" },
  { value: "Mitsubishi", label: "Mitsubishi" },
  { value: "Nissan", label: "Nissan" },
  { value: "Lincoln", label: "Lincoln" },
  { value: "GMC", label: "GMC" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "MINI", label: "MINI" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "Aston Martin", label: "Aston Martin" },
  { value: "Pontiac", label: "Pontiac" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Audi", label: "Audi" },
  { value: "BMW", label: "BMW" },
  { value: "Mercedes", label: "Mercedes" },
  { value: "Chrysler", label: "Chrysler" },
  { value: "Kia", label: "Kia" },
  { value: "Land", label: "Land" },
];

makes.sort((a, b) => {
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
});

const SearchFormMobile = () => {

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const filteredList = useSelector((state) => state.cars.filteredCars);
  const favoritesList = useSelector((state) => state.cars.favoriteCars);
  const currentLocation = useSelector(state => state.cars.location)

  let listForSelect;
  currentLocation === "/catalog"
    ? (listForSelect = makes)
    : (listForSelect = favoritesList.map((car) => ({
        value: car.make,
        label: car.make,
      })));

  listForSelect.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }
    if (a.value > b.value) {
      return 1;
    }
    return 0;
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (currentLocation === "/catalog") {
      const dataToDispatch = { ...data };
      dataToDispatch.make = data.make?.value || null;
      dataToDispatch.price = +data.price?.value || null;
      dataToDispatch.mileageFrom = +data.mileageFrom;
      dataToDispatch.mileageTo = +data.mileageTo;
      const { make, price, mileageFrom, mileageTo } = dataToDispatch;

      if (make || price || mileageFrom || mileageTo) {
        dispatch(getCarsByFilterThunk({ make, price, mileageFrom, mileageTo }))
          .unwrap()
          .then(() => {
            toast.success(`We found ${filteredList.length} cars`);
          });
        dispatch(setReachOut(true));
        reset(defaultValues);
      } else {
        toast.info("You must choose at least one field for filtering");
      }
    } else if (currentLocation === "/favorites") {
      const filteredCarsToDispatch = favoritesList.filter(
        (car) => (car.make === data.make.value)
      );
      dispatch(setFilteredCars(filteredCarsToDispatch));
    }
  };

  const handleClearResults = () => {
    dispatch(setEmptyCarsList());
    dispatch(setFilteredCars([]));
  };

  return (
    <div>
      <StyledFormMobile onSubmit={handleSubmit(onSubmit)}>
        <label>
          <StyledSpanMobile>Car brand</StyledSpanMobile>
          <Controller
            name="make"
            control={control}
            render={({ field }) => (
              <Select
                {...register("price")}
                styles={makeStyles}
                {...field}
                options={listForSelect}
                isClearable={true}
                isSearchable={true}
                placeholder="Choose a brand"
              />
            )}
          />
        </label>
        <label>
          <StyledSpanMobile>Price / 1 hour</StyledSpanMobile>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Select
                // {...register("price")}
                placeholder="To $"
                styles={priceStyles}
                {...field}
                options={price}
                isClearable={true}
                isSearchable={true}
              />
            )}
          />
        </label>
        <label>
          <StyledSpanMobile>Сar mileage / km</StyledSpanMobile>
          <StyledInputWrapperMobile>
            <StyledMileageFromInputMobile
              type="number"
              {...register("mileageFrom", {
                min: { value: 0, message: "Min value 0" },
              })}
              placeholder="From"
            />
            {errors.mileageFrom && <StyledFromErrorMobile>{errors.mileageFrom.message}</StyledFromErrorMobile>}
            <StyledMileageToInputMobile
              type="number"
              placeholder="To"
              {...register("mileageTo", {
                min: { value: 0, message: "Min value 0" },
              })}
            />
          {errors.mileageTo && <StyledToError>{errors.mileageTo.message}</StyledToError>}
          </StyledInputWrapperMobile>
        </label>
        <StyledSearchButtonMobile>Search</StyledSearchButtonMobile>
        {filteredList.length ? (
          <StyledSearchButtonMobile type="button" onClick={handleClearResults}>
            Clear results
          </StyledSearchButtonMobile>
        ) : null}
      </StyledFormMobile>
    </div>
  );
};

export default SearchFormMobile;
