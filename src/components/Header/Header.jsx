import { useDispatch, useSelector } from "react-redux";
import { ContainerStyles } from "../../General.styled";
import logo from "../../assets/images/logo.png";
import sprite from "../../assets/images/sprite.svg";
import ModalMenu from "../ModalMenu/ModalMenu";
import {
  StyledBurgerBtn,
  StyledLogo,
  StyledNavBar,
  StyledNavLink,
  StyledNavWrapper,
  StyledNavigationLinks,
  StyledNavigationLinksModal,
} from "./Header.styled";
import { toggleModalMenu } from "../../redux/carsReducer";

const Header = () => {
  const modalMenuStatus = useSelector((state) => state.cars.modalMenuStatus);
  const dispatch = useDispatch();
  const handleMenuOpen = () => {
    dispatch(toggleModalMenu());
    console.log(`status - ${modalMenuStatus}`)
  };

  return (
    <ContainerStyles>
      <StyledNavBar>
        <StyledLogo to="/">
          <img src={logo} alt="logo" width={"100px"} />
        </StyledLogo>
        <StyledNavWrapper>
          <StyledNavigationLinks>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/catalog">Catalog</StyledNavLink>
            <StyledNavLink to="/favorites">Favorites</StyledNavLink>
          </StyledNavigationLinks>
          <StyledBurgerBtn onClick={handleMenuOpen}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-burger-menu`} />
            </svg>
          </StyledBurgerBtn>
        </StyledNavWrapper>
      </StyledNavBar>
      {modalMenuStatus ? <ModalMenu>
        <StyledNavigationLinksModal>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/catalog">Catalog</StyledNavLink>
            <StyledNavLink to="/favorites">Favorites</StyledNavLink>
          </StyledNavigationLinksModal>
      </ModalMenu> : null}
    </ContainerStyles>
  );
};

export default Header;
