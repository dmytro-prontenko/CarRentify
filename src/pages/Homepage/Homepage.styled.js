import { NavLink } from "react-router-dom";
import styled from "styled-components";
// import background from '../../assets/images/background.webp';

export const HomePageWrapper = styled.div`
  margin: 0 auto;
  /* color:white; */
`;

export const StyledMainHeader = styled.h1`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;
`;

export const StyledHeaderSpan = styled.span`
  text-align: center;
`;

export const StyledBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media screen and (min-width: 768px) {
    /* width: 60%; */
    width: calc(50% - 15px);
    margin-bottom: 30px;
  }
`;

export const StyledBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    margin-top: 70px;
    justify-content: space-between;
    flex-wrap: wrap;
    min-width: 768px;
  }

  @media screen and (min-width: 1280px) {
    min-width: 1280px;
    flex-wrap: wrap;
    flex-direction: row;
  }

  ${StyledBlock}:nth-child(even) {
    margin-left: auto;
  }

  ${StyledBlock}:nth-child(odd) {
    margin-right: auto;
  }
`;

export const StyledStartButton = styled.button`
  display: flex;

  border: none;
  background-color: #3470ff;
  border-radius: 12px;
  color: white;
  margin: 40px auto;
  padding: 0;
`;

export const StyledStartLink = styled(NavLink)`
  width: 100%;
  text-decoration: none;
  padding: 14px 44px;
`;
