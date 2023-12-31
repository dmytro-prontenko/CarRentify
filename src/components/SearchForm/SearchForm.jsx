import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  setEmptyCarsList,
  setFilteredCars,
  setReachOut,
} from "../../redux/carsReducer";
import { getCarsByFilterThunk } from "../../redux/thunks";
import {
  FormBrandPriceWrapper,
  FormButtonsWrapper,
  StyledForm,
  StyledFromError,
  StyledInputWrapper,
  StyledMileageFromInput,
  StyledMileageToInput,
  StyledSearchButton,
  StyledSpan,
  StyledToError,
} from "./SearchForm.styled";
import { makeStyles, priceStyles } from "./Select.styles";
import {
  selectFavoriteCars,
  selectFilteredList,
  selectLocation,
} from "../../redux/selectors";

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

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const filteredList = useSelector(selectFilteredList);
  const favoritesList = useSelector(selectFavoriteCars);
  const currentLocation = useSelector(selectLocation);

  let uniqueMaker = [...new Set(favoritesList.map((item) => item.make))];
  let favoritesListClear = uniqueMaker.map((make) => ({
    label: make,
    value: make,
  }));

  let listForSelect;
  currentLocation === "/catalog"
    ? (listForSelect = makes)
    : (listForSelect = favoritesListClear);

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
    console.log(data);
    e.preventDefault();
    const dataToDispatch = { ...data };
    dataToDispatch.make = data.make?.value || null;
    dataToDispatch.price = +data.price?.value || null;
    dataToDispatch.mileageFrom = +data.mileageFrom?.replace(",", "") || 0;
    dataToDispatch.mileageTo = +data.mileageTo?.replace(",", "") || 0;
    const { make, price, mileageFrom, mileageTo } = dataToDispatch;
    if (currentLocation === "/catalog") {
      if (make || price || mileageFrom || mileageTo) {
        dispatch(getCarsByFilterThunk({ make, price, mileageFrom, mileageTo }));
        dispatch(setReachOut(true));
        reset(defaultValues);
      } else {
        toast.info("You must choose at least one field for filtering");
      }
    } else if (currentLocation === "/favorites") {
      if (make || price || mileageFrom || mileageTo) {
        let filteredCarsToDispatch =[];
        filteredCarsToDispatch.push(...favoritesList);
        if (make) {
          filteredCarsToDispatch = filteredCarsToDispatch?.filter(
            (car) => car.make === dataToDispatch.make
          );
        }
        console.log(filteredCarsToDispatch);

        if (price) {
          filteredCarsToDispatch = filteredCarsToDispatch.filter(
            (car) => +car.rentalPrice.split("$")[1] <= dataToDispatch.price
          );
        }
        console.log(filteredCarsToDispatch);

        if (mileageFrom) {
          filteredCarsToDispatch = filteredCarsToDispatch.filter(
            (car) => car.mileage >= +dataToDispatch.mileageFrom
          );
        }
        console.log(filteredCarsToDispatch);

        if (mileageTo) {
          filteredCarsToDispatch = filteredCarsToDispatch.filter(
            (car) => car.mileage <= +dataToDispatch.mileageTo
          );
        }
        console.log(filteredCarsToDispatch);
        dispatch(setFilteredCars(filteredCarsToDispatch));
      } else {
        toast.info("You must choose at least one field for filtering");
      }
    }
  };

  const handleClearResults = () => {
    dispatch(setEmptyCarsList());
    dispatch(setFilteredCars([]));
    reset(defaultValues);
  };

  const handleChange = (value) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormBrandPriceWrapper>
          <label>
            <StyledSpan>Car brand</StyledSpan>
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
            <StyledSpan>Price / 1 hour</StyledSpan>
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
        </FormBrandPriceWrapper>
        <label>
          <StyledSpan>Сar mileage / km</StyledSpan>
          <StyledInputWrapper>
            <StyledMileageFromInput
              type="tel"
              {...register("mileageFrom", {
                onChange: (e) =>
                  setValue("mileageFrom", handleChange(e.target.value)),
                min: { value: 0, message: "Min value 0" },
              })}
              placeholder="From"
            />
            {errors.mileageFrom && (
              <StyledFromError>{errors.mileageFrom.message}</StyledFromError>
            )}
            <StyledMileageToInput
              type="tel"
              placeholder="To"
              {...register("mileageTo", {
                onChange: (e) =>
                  setValue("mileageTo", handleChange(e.target.value)),
                min: { value: 0, message: "Min value 0" },
              })}
            />
            {errors.mileageTo && (
              <StyledToError>{errors.mileageTo.message}</StyledToError>
            )}
          </StyledInputWrapper>
        </label>
        <FormButtonsWrapper>
          <StyledSearchButton id="search" title="Search cars">
            Search
          </StyledSearchButton>
          {filteredList.length ? (
            <StyledSearchButton
              id="clear-search"
              title="Clear search params"
              type="button"
              onClick={handleClearResults}
            >
              Clear results
            </StyledSearchButton>
          ) : null}
        </FormButtonsWrapper>
      </StyledForm>
    </div>
  );
};

export default SearchForm;
