import styled from "styled-components";

const UiCard = styled.div`
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  min-height: 101.5px;
  width: 100%;
  margin-bottom: 18.5px;
  transition: 0.5s;
  :hover {
    background: #001d56;
  }
  cursor: pointer;
  & .companyCard {
    display: flex;
    text-align: center;
    justify-content: center;
    padding: 40px;
    align-items: center;
    color: black;
    font-weight: 500;
    font-size: 25px;
    line-height: 20px;
    :hover {
      color: white;
    }
    @media (max-width: 500px) {
      font-size: 20px;
   
    }
  }
`;
export default UiCard;
