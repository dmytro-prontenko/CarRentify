import { useDispatch, useSelector } from "react-redux";
import notFoundImg from "../../images/noFoundCar.png";
import { setModalId } from "../../redux/carsReducer";
import {
  StyledCarInfo,
  StyledCarModel,
  StyledCarSubtitle,
  StyledCarTitle,
  StyledCard,
  StyledImg,
  StyledLearnMoreBtn,
} from "./GalleyItems.styled";

// import { useEffect, useRef } from "react";
export const GalleryItems = () => {
  const carsList = useSelector((state) => state.cars.cars);
  // const filteredList = useSelector((state) => state.cars.filteredCars);
  // const carsToRender = filteredList || carsList;
  const dispatch = useDispatch();

  // const carsToRenderRef = useRef([]);
  // useEffect(() => {
  //   if (filteredList.length) {
  //     carsToRenderRef.current = [...filteredList];
  //   } else {
  //     carsToRenderRef.current = [...carsList];
  //   }
  // }, [filteredList, carsList]);
  const handleSetModalId = (id) => {
    dispatch(setModalId(id));
  };

  const carsItems = carsList.map((car) => {
    return (
      <StyledCard key={car.id}>
        <>
          <StyledImg
            src={car.img || notFoundImg}
            alt={`${car.make} ${car.model}`}
            onError={(e) => {
              e.currentTarget.src = notFoundImg;
            }}
          />
          <StyledCarTitle>
            <StyledCarSubtitle>
              {car.make}
              <StyledCarModel>{car.model}, </StyledCarModel>
              {car.year}
            </StyledCarSubtitle>
            <p>{car.rentalPrice}</p>
          </StyledCarTitle>
          <StyledCarInfo>
            {`${car.address.split(", ")[1]} | ${car.address.split(", ")[2]} | ${
              car.rentalCompany
            } |
            Premium | ${car.type} | ${car.model} | ${car.id} | ${
              car.functionalities[0]
            }`}
          </StyledCarInfo>
        </>
        <StyledLearnMoreBtn onClick={() => handleSetModalId(car.id)}>
          Learn more
        </StyledLearnMoreBtn>
      </StyledCard>
    );
  });
  return carsItems;
};